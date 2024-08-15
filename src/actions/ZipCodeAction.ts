"use server";
/**
 * Fetches the city and state associated with a given zipcode.
 *
 * @param {string} zipcode - The zipcode to look up.
 * @return {Promise<{ city: string; state: string; } | { error: string; }>} - A promise that resolves to an object containing the city and state if the lookup is successful, or an error message if there was an error.
 */
export async function fetchCityAndState(zipcode: string) {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
    const data = await response.json();

    // if (data.error) {
    //   return { error: data.error };
    // }

    return {
      city: data?.places[0]["place name"],
      state: data?.places[0]["state"],
      stateAbbr: data?.places[0]["state abbreviation"],
    };
  } catch (e: any) {
    console.log(e);
    return { error: "Invalid Zip Code" };
  }
}
