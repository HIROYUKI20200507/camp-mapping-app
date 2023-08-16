const URL_CITY = "https://opendata.resas-portal.go.jp/api/v1/cities";
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const cityData = $fetch(`${URL_CITY}?prefCode=${body.prefId}`, {
      headers: { "X-API-KEY": config.resasApiKey },
    });

    return cityData;
  } catch (error) {
    console.error(error);
    return error;
  }
});
