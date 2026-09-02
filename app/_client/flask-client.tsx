// process.env.VERCEL_URL is auto-set by Vercel to *this specific deployment's*
// own origin, so it can never drift stale the way a manually-configured
// BASE_URL project variable would. Only readable server-side; a browser fetch
// resolves relative URLs against the current page's origin, so skip it there.
const base_url =
  typeof window === "undefined"
    ? process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.BASE_URL ?? "")
    : "";

export async function get_place_list() {
  try {
    return await fetch(
      "" + base_url + process.env.NEXT_PUBLIC_BACKEND_URL + "/list/",
    ).then((res) => (res.ok ? res.json() : []));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function get_place_data(place_name: string) {
  try {
    return await fetch(
      "" +
        base_url +
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/place/" +
        place_name +
        "/",
    ).then((res) => (res.ok ? res.json() : null));
  } catch (e) {
    console.log("Place not found");
    return null;
  }
}

export async function add_place(
  place_data: Record<string, unknown>,
  place_review: Record<string, unknown>,
) {
  try {
    const res = await fetch(
      "" + base_url + process.env.NEXT_PUBLIC_BACKEND_URL + "/place/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ place_data, place_review }),
      },
    );
    return res.ok;
  } catch (e) {
    console.log(e);
    return false;
  }
}
