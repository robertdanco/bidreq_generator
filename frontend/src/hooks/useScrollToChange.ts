import { useRef, useEffect, useCallback } from 'react';

// Keys to skip during comparison (these change on every render)
const SKIP_KEYS = new Set(['id']);

/**
 * Deep clone an object for comparison purposes.
 */
function deepClone(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const cloned: Record<string, unknown> = {};
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return cloned;
}

/**
 * Finds the first path that differs between two JSON objects.
 * Returns null if objects are identical or if comparison is not possible.
 * Skips keys that are in SKIP_KEYS at the root level.
 */
function findChangedPath(
  prev: unknown,
  curr: unknown,
  path: string[] = [],
  isRoot = true
): string[] | null {
  // Handle null/undefined
  if (prev === curr) return null;
  if (prev === null || curr === null) return path;
  if (prev === undefined || curr === undefined) return path;

  // Handle primitives
  if (typeof prev !== 'object' || typeof curr !== 'object') {
    return prev !== curr ? path : null;
  }

  // Handle arrays
  if (Array.isArray(prev) && Array.isArray(curr)) {
    // Check for length changes first
    if (prev.length !== curr.length) {
      return path;
    }
    // Check each element
    for (let i = 0; i < curr.length; i++) {
      const changedPath = findChangedPath(prev[i], curr[i], [...path, String(i)], false);
      if (changedPath) return changedPath;
    }
    return null;
  }

  // Handle objects
  const prevObj = prev as Record<string, unknown>;
  const currObj = curr as Record<string, unknown>;

  // Get keys, filtering out skip keys at root level
  const prevKeys = Object.keys(prevObj).filter((k) => !(isRoot && SKIP_KEYS.has(k)));
  const currKeys = Object.keys(currObj).filter((k) => !(isRoot && SKIP_KEYS.has(k)));

  // Check for added keys
  for (const key of currKeys) {
    if (!(key in prevObj)) {
      return [...path, key];
    }
  }

  // Check for removed keys
  for (const key of prevKeys) {
    if (!(key in currObj)) {
      return [...path, key];
    }
  }

  // Check each property for changes
  for (const key of currKeys) {
    const changedPath = findChangedPath(prevObj[key], currObj[key], [...path, key], false);
    if (changedPath) return changedPath;
  }

  return null;
}

/**
 * Custom hook that tracks changes between renders and provides
 * the path to the first changed field in a JSON object.
 */
export function useScrollToChange(data: unknown) {
  const prevDataRef = useRef<unknown>(null);
  const changedPathRef = useRef<string[] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Compare current data with previous to find changed path
  useEffect(() => {
    if (prevDataRef.current !== null) {
      const changedPath = findChangedPath(prevDataRef.current, data);
      changedPathRef.current = changedPath;
    }
    // Deep clone to ensure we have an independent copy for comparison
    prevDataRef.current = deepClone(data);
  }, [data]);

  // Scroll to the changed element
  const scrollToChange = useCallback(() => {
    const changedPath = changedPathRef.current;
    const container = scrollContainerRef.current;

    if (!changedPath || changedPath.length === 0 || !container) {
      return;
    }

    // Wait for DOM to update
    requestAnimationFrame(() => {
      // The @uiw/react-json-view library uses specific DOM structure
      // Keys are rendered with specific styling - we look for the key text
      const targetKey = changedPath[changedPath.length - 1];

      // Fallback: search all text nodes for the key
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
      let foundElement: Element | null = null;

      // First, try to find exact key match
      while (walker.nextNode()) {
        const textNode = walker.currentNode;
        const text = textNode.textContent?.trim() || '';

        // Keys are usually rendered with quotes like "keyName"
        if (text === `"${targetKey}"` || text === targetKey) {
          const parent = textNode.parentElement;
          if (parent) {
            // Walk up to find a reasonable container to scroll to
            foundElement = parent.closest('[style*="line-height"]') || parent;
            break;
          }
        }
      }

      // If we found the element, scroll to it
      if (foundElement) {
        foundElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Add a brief highlight effect using CSS animation
        const originalBg = (foundElement as HTMLElement).style.backgroundColor;
        (foundElement as HTMLElement).style.backgroundColor = 'rgba(0, 217, 255, 0.3)';
        (foundElement as HTMLElement).style.transition = 'background-color 0.3s ease-out';

        setTimeout(() => {
          (foundElement as HTMLElement).style.backgroundColor = originalBg;
        }, 1000);
      } else {
        // Fallback: If we can't find the specific element, try using path depth
        // to estimate scroll position - scroll proportionally through the container
        const pathDepth = changedPath.length;
        const allLines = container.querySelectorAll('[style*="line-height"]');
        const estimatedIndex = Math.min(pathDepth * 3, allLines.length - 1);

        if (allLines[estimatedIndex]) {
          allLines[estimatedIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }

      // Clear the changed path after scrolling
      changedPathRef.current = null;
    });
  }, []);

  return {
    scrollContainerRef,
    scrollToChange,
    changedPath: changedPathRef.current,
  };
}
