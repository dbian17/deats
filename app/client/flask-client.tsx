export async function get_test_data() {
  try {
    return await fetch(
      "" + process.env.BASE_URL + process.env.NEXT_PUBLIC_BACKEND_URL,
    ).then((res) => res.text());
  } catch (e) {
    console.log(e);
    return "ya fcked up";
  }
}

export async function get_place_list() {
  try {
    return await fetch(
      "" + process.env.BASE_URL + process.env.NEXT_PUBLIC_BACKEND_URL + "/list/",
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
        process.env.BASE_URL +
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
