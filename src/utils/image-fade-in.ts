/**
 * 图片淡入效果
 * 类似 Apple Newsroom 首页的滚动淡入效果
 * 支持 Astro View Transitions
 */

interface FadeInOptions {
    threshold?: number;
    rootMargin?: string;
    duration?: number;
    delay?: number;
    stagger?: number; // 多个图片的交错延迟
}

class ImageFadeIn {
    private observer: IntersectionObserver | null = null;
    private mutationObserver: MutationObserver | null = null;
    private options: Required<FadeInOptions>;
    private imageCount: number = 0;

    constructor(options: FadeInOptions = {}) {
        this.options = {
            threshold: options.threshold ?? 0.1,
            rootMargin: options.rootMargin ?? '0px 0px -80px 0px',
            duration: options.duration ?? 800,
            delay: options.delay ?? 0,
            stagger: options.stagger ?? 50,
        };

        this.init();
    }

    private init(): void {
        // 检查浏览器是否支持 Intersection Observer
        if (!('IntersectionObserver' in window)) {
            console.warn('Intersection Observer not supported');
            return;
        }

        // 创建 Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.fadeInImage(entry.target as HTMLElement);
                    }
                });
            },
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin,
            }
        );

        // 观察所有图片元素
        this.observeImages();

        // 观察文字元素
        this.observeTextElements();

        // 监听 DOM 变化，处理动态加载的图片
        this.observeDOMChanges();

        // 支持 Astro View Transitions
        this.setupViewTransitions();
    }

    private observeImages(): void {
        if (!this.observer) return;

        // 选择所有需要淡入效果的图片
        // 排除已经观察过的和明确标记不需要淡入的图片
        const images = document.querySelectorAll<HTMLElement>(
            'img:not([data-no-fade]):not([data-fade-observed]), picture:not([data-no-fade]):not([data-fade-observed])'
        );

        // 找出第一张内容图片（可能是 LCP 候选）
        let firstContentImage: HTMLElement | null = null;

        images.forEach((img) => {
            // 检查是否是高优先级图片（明确的 LCP 候选）
            const isPriority =
                img.getAttribute('fetchpriority') === 'high' ||
                img.getAttribute('loading') === 'eager' ||
                img.hasAttribute('priority');

            // 检查图片是否在首屏（视口内）
            const rect = img.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            // 如果是首屏图片且还没有找到第一张内容图片，记录它
            if (isInViewport && !firstContentImage && !this.isNavigationImage(img)) {
                firstContentImage = img;
            }

            // 只排除以下图片的淡入效果：
            // 1. 明确设置了高优先级的图片
            // 2. 第一张内容图片（LCP 候选）
            // 3. 导航/Logo 等小图片
            const shouldExclude =
                isPriority ||
                img === firstContentImage ||
                this.isNavigationImage(img);

            if (shouldExclude) {
                img.setAttribute('data-no-fade', 'true');
                img.setAttribute('data-fade-observed', 'true');
                return;
            }

            // 其余所有图片（包括首屏的其他图片）都应用淡入效果
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
            img.style.transition = `opacity ${this.options.duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${this.options.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            img.style.willChange = 'opacity, transform';
            img.setAttribute('data-fade-observed', 'true');

            // 为每个图片设置一个递增的延迟索引
            img.setAttribute('data-fade-index', String(this.imageCount++));

            this.observer!.observe(img);
        });
    }

    /**
     * 判断是否是导航/Logo 等小图片
     */
    private isNavigationImage(img: HTMLElement): boolean {
        // 检查父元素是否是导航、Header、Footer
        const parent = img.closest('header, nav, footer, [role="navigation"]');
        if (parent) {
            return true;
        }

        // 检查图片尺寸（小于 80x80 的可能是 Logo/图标）
        const rect = img.getBoundingClientRect();
        if (rect.width < 80 && rect.height < 80) {
            return true;
        }

        // 检查 alt 或 class 是否包含 logo/icon 等关键词
        const alt = img.getAttribute('alt')?.toLowerCase() || '';
        const className = img.className?.toLowerCase() || '';
        const keywords = ['logo', 'icon', 'badge'];

        if (keywords.some(keyword => alt.includes(keyword) || className.includes(keyword))) {
            return true;
        }

        return false;
    }

    /**
     * 观察文字元素（标题、段落等）
     */
    private observeTextElements(): void {
        if (!this.observer) return;

        // 选择需要淡入效果的文字元素
        const textElements = document.querySelectorAll<HTMLElement>(
            'h1:not([data-fade-observed]), h2:not([data-fade-observed]), h3:not([data-fade-observed]), p:not([data-fade-observed])'
        );

        textElements.forEach((element) => {
            // 排除导航、Header、Footer 中的文字
            const parent = element.closest('header, nav, footer, [role="navigation"]');
            if (parent) {
                element.setAttribute('data-fade-observed', 'true');
                return;
            }

            // 检查是否在首屏
            const rect = element.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            // 首屏文字立即显示
            if (isInViewport) {
                element.setAttribute('data-fade-observed', 'true');
                return;
            }

            // 添加初始样式（文字动画稍慢，位移更大）
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1)`;
            element.style.willChange = 'opacity, transform';
            element.setAttribute('data-fade-observed', 'true');
            element.setAttribute('data-fade-index', String(this.imageCount++));

            this.observer!.observe(element);
        });
    }

    private fadeInImage(element: HTMLElement): void {
        if (!this.observer) return;

        // 获取图片的索引，用于计算交错延迟
        const fadeIndex = parseInt(element.getAttribute('data-fade-index') || '0', 10);
        const staggerDelay = fadeIndex * this.options.stagger;
        const totalDelay = this.options.delay + staggerDelay;

        // 添加延迟效果
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';

            // 动画完成后停止观察并清理属性
            setTimeout(() => {
                this.observer?.unobserve(element);
                element.removeAttribute('data-fade-index');
                // 清理 will-change 以释放资源
                element.style.willChange = 'auto';
            }, this.options.duration);
        }, totalDelay);
    }

    private observeDOMChanges(): void {
        // 使用 MutationObserver 监听 DOM 变化
        this.mutationObserver = new MutationObserver((mutations) => {
            let hasNewImages = false;

            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const element = node as HTMLElement;
                            // 检查是否是图片元素或包含图片的元素
                            if (
                                element.tagName === 'IMG' ||
                                element.tagName === 'PICTURE' ||
                                element.querySelector('img, picture')
                            ) {
                                hasNewImages = true;
                            }
                        }
                    });
                }
            });

            if (hasNewImages) {
                // 使用 requestAnimationFrame 优化性能
                requestAnimationFrame(() => {
                    this.observeImages();
                });
            }
        });

        this.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    private setupViewTransitions(): void {
        // 支持 Astro View Transitions
        document.addEventListener('astro:page-load', () => {
            // 重置计数器
            this.imageCount = 0;
            // 重新观察新页面的图片和文字
            this.observeImages();
            this.observeTextElements();
        });

        // 在页面切换前清理
        document.addEventListener('astro:before-preparation', () => {
            // 清理所有正在观察的元素
            if (this.observer) {
                this.observer.disconnect();
            }
        });
    }

    public destroy(): void {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
    }
}

// 页面加载完成后初始化
if (typeof window !== 'undefined') {
    // 等待 DOM 加载完成
    const initFadeIn = () => {
        new ImageFadeIn({
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px',
            duration: 800,
            delay: 0,
            stagger: 50,
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFadeIn);
    } else {
        // DOM 已经加载完成
        initFadeIn();
    }
}

export default ImageFadeIn;
