import "server-only";

/**
 * Best-effort, in-memory sliding-window rate limiter.
 *
 * On serverless hosting (Vercel) each function instance has its own memory,
 * so the limit applies per instance, not globally, and resets on a cold
 * start. It slows down simple abuse; for a hard limit use a shared store
 * (for example Upstash Redis) or the host's firewall rules.
 *
 * @param {{ limit: number, windowMs: number, maxKeys?: number }} options
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }) {
  /** @type {Map<string, number[]>} */
  const hits = new Map();

  return {
    /**
     * Records a hit for `key` and reports whether it is over the limit.
     * @param {string} key
     */
    hit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      recent.push(now);
      hits.set(key, recent);
      // Keep memory bounded: drop the oldest key when the map grows too big.
      if (hits.size > maxKeys)
        hits.delete(/** @type {string} */ (hits.keys().next().value));
      return { limited: recent.length > limit, count: recent.length };
    },
  };
}
