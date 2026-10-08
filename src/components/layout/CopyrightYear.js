import { cacheLife } from "next/cache";

/**
 * The current year. With Cache Components, reading the clock must happen
 * inside "use cache" (docs: caching.md, "Random values and timestamps").
 * The "max" profile keeps pages static and refreshes the value at most every
 * 30 days, or on each deploy.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}
