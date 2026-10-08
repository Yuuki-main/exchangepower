/**
 * @typedef {string | number | boolean | null | undefined} ClassPrimitive
 * @typedef {ClassPrimitive | ClassPrimitive[] | ClassPrimitive[][]} ClassValue
 */

/**
 * Joins class names, skipping falsy values and flattening arrays.
 *
 * It does not resolve conflicting Tailwind utilities. When a component accepts
 * a `className` override, pass classes that add to its styles rather than
 * fight them.
 *
 * @example cn("px-4", isActive && "bg-brand-700", ["text-sm", null])
 * @param {...ClassValue} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  /** @type {string[]} */
  const out = [];
  for (const input of inputs) {
    if (!input && input !== 0) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}
