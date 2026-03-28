import React from "react";
import { LunaButton } from "../luna-button";
import type { LunaPaginationProps, LunaPaginationSize } from "./LunaPagination.props";
import "./LunaPagination.css";

type PaginationItem = number | "ellipsis";

function toClassName(parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function normalizeInteger(value: number, fallback: number) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.trunc(value);
}

function normalizeNonNegativeInteger(value: number, fallback: number) {
  return Math.max(0, normalizeInteger(value, fallback));
}

function clampPage(page: number, totalPages: number) {
  if (totalPages < 1) {
    return 0;
  }

  return Math.min(Math.max(page, 1), totalPages);
}

function buildPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
) {
  const pages = new Set<number>();

  for (let page = 1; page <= Math.min(boundaryCount, totalPages); page += 1) {
    pages.add(page);
  }

  for (
    let page = Math.max(totalPages - boundaryCount + 1, 1);
    page <= totalPages;
    page += 1
  ) {
    pages.add(page);
  }

  for (
    let page = Math.max(currentPage - siblingCount, 1);
    page <= Math.min(currentPage + siblingCount, totalPages);
    page += 1
  ) {
    pages.add(page);
  }

  pages.add(1);
  pages.add(totalPages);

  const sortedPages = [...pages].sort((left, right) => left - right);
  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    if (index === 0) {
      items.push(page);
      return;
    }

    const previousPage = sortedPages[index - 1];
    const gap = page - previousPage;

    if (gap === 2) {
      items.push(previousPage + 1);
    } else if (gap > 2) {
      items.push("ellipsis");
    }

    items.push(page);
  });

  return items;
}

function resolveButtonSize(size: LunaPaginationSize | undefined) {
  if (size === "sm") {
    return "small";
  }

  if (size === "lg") {
    return "large";
  }

  return "medium";
}

export const LunaPagination = React.forwardRef<HTMLElement, LunaPaginationProps>(
  function LunaPagination(
    {
      ariaLabel = "Pagination",
      boundaryCount = 1,
      className,
      currentPage,
      disabled = false,
      nextLabel = "Next",
      onPageChange,
      previousLabel = "Previous",
      showPreviousNext = true,
      siblingCount = 1,
      size = "md",
      style,
      totalPages,
      ...props
    },
    ref
  ) {
    const resolvedTotalPages = normalizeNonNegativeInteger(totalPages, 0);

    if (resolvedTotalPages === 0) {
      return null;
    }

    const resolvedCurrentPage = clampPage(normalizeInteger(currentPage, 1), resolvedTotalPages);
    const resolvedSiblingCount = normalizeNonNegativeInteger(siblingCount, 1);
    const resolvedBoundaryCount = normalizeNonNegativeInteger(boundaryCount, 1);
    const buttonSize = resolveButtonSize(size);
    const items = buildPaginationItems(
      resolvedCurrentPage,
      resolvedTotalPages,
      resolvedSiblingCount,
      resolvedBoundaryCount
    );

    function handlePageChange(page: number) {
      if (!onPageChange || disabled || page === resolvedCurrentPage) {
        return;
      }

      const nextPage = clampPage(page, resolvedTotalPages);

      if (nextPage !== resolvedCurrentPage) {
        onPageChange(nextPage);
      }
    }

    return (
      <nav
        {...props}
        ref={ref}
        className={toClassName(["luna-pagination", className])}
        aria-label={ariaLabel}
        data-size={size}
        style={style}
      >
        <ul className="luna-pagination__list">
          {showPreviousNext ? (
            <li className="luna-pagination__item">
              <LunaButton
                outline
                className="luna-pagination__control luna-pagination__control--direction"
                size={buttonSize}
                onClick={() => handlePageChange(resolvedCurrentPage - 1)}
                disabled={disabled || resolvedCurrentPage <= 1}
                aria-label="Go to previous page"
              >
                {previousLabel}
              </LunaButton>
            </li>
          ) : null}
          {items.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <li className="luna-pagination__item" key={`ellipsis-${index}`}>
                  <span
                    aria-hidden="true"
                    className="luna-pagination__ellipsis"
                  >
                    …
                  </span>
                </li>
              );
            }

            const isCurrent = item === resolvedCurrentPage;

            return (
              <li className="luna-pagination__item" key={item}>
                <LunaButton
                  className={toClassName([
                    "luna-pagination__control",
                    isCurrent && "luna-pagination__control--current"
                  ])}
                  outline={!isCurrent}
                  size={buttonSize}
                  onClick={() => handlePageChange(item)}
                  disabled={disabled}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-label={isCurrent ? `Current page, page ${item}` : `Go to page ${item}`}
                >
                  {item}
                </LunaButton>
              </li>
            );
          })}
          {showPreviousNext ? (
            <li className="luna-pagination__item">
              <LunaButton
                outline
                className="luna-pagination__control luna-pagination__control--direction"
                size={buttonSize}
                onClick={() => handlePageChange(resolvedCurrentPage + 1)}
                disabled={disabled || resolvedCurrentPage >= resolvedTotalPages}
                aria-label="Go to next page"
              >
                {nextLabel}
              </LunaButton>
            </li>
          ) : null}
        </ul>
      </nav>
    );
  }
);
