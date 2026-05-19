import { describe, expect, test } from "vitest"

import {
  getPageSlice,
  getPaginationLinks,
  getTotalPages,
  pageRange,
} from "../src/utils/pagination"

describe("getTotalPages", () => {
  test("keeps list pages valid even when the list is empty", () => {
    expect(getTotalPages(0, 20)).toBe(1)
    expect(getTotalPages(20, 20)).toBe(1)
    expect(getTotalPages(21, 20)).toBe(2)
  })
})

describe("getPageSlice", () => {
  test("returns the items for a requested page", () => {
    expect(getPageSlice([1, 2, 3, 4, 5], 2, 2)).toEqual([3, 4])
  })
})

describe("getPaginationLinks", () => {
  test("builds first-page links with next and last targets", () => {
    expect(
      getPaginationLinks({
        currentPage: 1,
        totalPages: 4,
        buildPageUrl: (page) => (page === 1 ? "/zh/" : `/zh/${page}/`),
      })
    ).toEqual({
      prev: undefined,
      next: "/zh/2/",
      first: undefined,
      last: "/zh/4/",
    })
  })

  test("builds middle-page links with first and last targets", () => {
    expect(
      getPaginationLinks({
        currentPage: 3,
        totalPages: 5,
        buildPageUrl: (page) =>
          page === 1 ? "/zh/posts/" : `/zh/posts/${page}/`,
      })
    ).toEqual({
      prev: "/zh/posts/2/",
      next: "/zh/posts/4/",
      first: "/zh/posts/",
      last: "/zh/posts/5/",
    })
  })
})

describe("pageRange", () => {
  test("returns one-based page numbers", () => {
    expect(pageRange(3)).toEqual([1, 2, 3])
  })
})
