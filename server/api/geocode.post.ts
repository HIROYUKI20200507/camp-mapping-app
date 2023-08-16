const URL_GEOCODE = "https://maps.googleapis.com/maps/api/geocode/json?";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const prefData = $fetch(
      `${URL_GEOCODE}&key=${config.googleGeoCodingApiKey}&address=${body.address}&components=country:JP`
    );

    return prefData;
  } catch (error) {
    console.error(error);
    return error;
  }
});
