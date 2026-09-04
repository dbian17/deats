// process.env.VERCEL_URL is auto-set by Vercel to *this specific deployment's*
// own origin, so it can never drift stale the way a manually-configured
// BASE_URL project variable would. Only readable server-side; a browser fetch
// resolves relative URLs against the current page's origin, so skip it there.
export const base_url =
  typeof window === "undefined"
    ? process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.BASE_URL ?? "")
    : "";
