/**
 * 全局页面初始化管理器
 * 
 * 统一管理 Astro View Transitions 的页面初始化逻辑，
 * 确保在页面加载和导航时正确初始化组件。
 * 
 * @example
 * ```typescript
 * import { registerPageInit } from '@/utils/page-init';
 * 
 * // 注册初始化函数
 * registerPageInit('themeSwitcher', () => {
 *   const buttons = document.querySelectorAll('[data-theme]');
 *   // ... 初始化逻辑
 * });
 * ```
 */

type InitFunction = () => void | (() => void);
type CleanupFunction = () => void;

interface InitHandler {
    init: InitFunction;
    cleanup?: CleanupFunction;
}

class PageInitManager {
    private handlers: Map<string, InitHandler> = new Map();
    private cleanupFunctions: Map<string, CleanupFunction> = new Map();
    private initialized = false;

    constructor() {
        this.setup();
    }

    private setup(): void {
        if (typeof window === 'undefined') return;

        // 首次加载时初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.runAllInits());
        } else {
            this.runAllInits();
        }

        // Astro 视图转换时重新初始化
        document.addEventListener('astro:page-load', () => {
            this.runAllInits();
        });

        // 页面切换前清理
        document.addEventListener('astro:before-preparation', () => {
            this.runAllCleanups();
        });
    }

    /**
     * 注册页面初始化函数
     * 
     * @param name - 唯一标识符
     * @param init - 初始化函数，可选返回清理函数
     * @param options - 配置选项
     */
    register(
        name: string,
        init: InitFunction,
        options?: {
            /** 是否立即执行（如果页面已加载） */
            immediate?: boolean;
        }
    ): void {
        const cleanup = this.cleanupFunctions.get(name);
        if (cleanup) {
            cleanup();
            this.cleanupFunctions.delete(name);
        }

        this.handlers.set(name, { init });

        // 如果页面已初始化且设置了立即执行，则立即运行
        if (this.initialized && options?.immediate) {
            this.runInit(name);
        }
    }

    /**
     * 取消注册初始化函数
     * 
     * @param name - 要移除的处理器名称
     */
    unregister(name: string): void {
        const cleanup = this.cleanupFunctions.get(name);
        if (cleanup) {
            cleanup();
            this.cleanupFunctions.delete(name);
        }
        this.handlers.delete(name);
    }

    private runInit(name: string): void {
        const handler = this.handlers.get(name);
        if (!handler) return;

        try {
            // 先清理之前的实例（如果有）
            const existingCleanup = this.cleanupFunctions.get(name);
            if (existingCleanup) {
                existingCleanup();
                this.cleanupFunctions.delete(name);
            }

            // 执行初始化
            const result = handler.init();

            // 如果返回了清理函数，保存起来
            if (typeof result === 'function') {
                this.cleanupFunctions.set(name, result);
            }
        } catch (error) {
            console.error(`[PageInit] Error initializing "${name}":`, error);
        }
    }

    private runAllInits(): void {
        this.handlers.forEach((_, name) => {
            this.runInit(name);
        });
        this.initialized = true;
    }

    private runAllCleanups(): void {
        this.cleanupFunctions.forEach((cleanup, name) => {
            try {
                cleanup();
            } catch (error) {
                console.error(`[PageInit] Error cleaning up "${name}":`, error);
            }
        });
        this.cleanupFunctions.clear();
    }

    /**
     * 获取所有已注册的处理器名称
     */
    getRegisteredHandlers(): string[] {
        return Array.from(this.handlers.keys());
    }
}

// 创建全局单例
const pageInitManager = new PageInitManager();

/**
 * 注册页面初始化函数
 * 
 * 该函数会在以下时机执行：
 * 1. 页面首次加载完成时（DOMContentLoaded）
 * 2. Astro 视图转换后（astro:page-load）
 * 
 * @param name - 唯一标识符，用于管理和调试
 * @param init - 初始化函数，可选返回清理函数
 * @param options - 配置选项
 * 
 * @example
 * ```typescript
 * // 基本用法
 * registerPageInit('myComponent', () => {
 *   const element = document.querySelector('#my-element');
 *   element?.addEventListener('click', handleClick);
 * });
 * 
 * // 带清理函数
 * registerPageInit('myComponent', () => {
 *   const element = document.querySelector('#my-element');
 *   const handler = () => console.log('clicked');
 *   element?.addEventListener('click', handler);
 *   
 *   // 返回清理函数
 *   return () => {
 *     element?.removeEventListener('click', handler);
 *   };
 * });
 * ```
 */
export function registerPageInit(
    name: string,
    init: InitFunction,
    options?: { immediate?: boolean }
): void {
    pageInitManager.register(name, init, options);
}

/**
 * 取消注册页面初始化函数
 * 
 * @param name - 要移除的处理器名称
 */
export function unregisterPageInit(name: string): void {
    pageInitManager.unregister(name);
}

/**
 * 获取所有已注册的初始化处理器名称
 */
export function getRegisteredInits(): string[] {
    return pageInitManager.getRegisteredHandlers();
}

// 导出类型供外部使用
export type { InitFunction, CleanupFunction };
