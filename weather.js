const APPID = process.env.WX_APPID;
const SECRET = process.env.WX_SECRET;
const OPENID = process.env.WX_OPENID;
const TEMPLATE_ID = process.env.WX_TEMPLATE_ID;
const WEATHER_KEY = process.env.WEATHER_KEY;

async function getAccessToken() {
  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`
  );

  const data = await res.json();

  return data.access_token;
}

async function getWeather() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Xiamen&appid=${WEATHER_KEY}&units=metric&lang=zh_cn`
  );

  const data = await res.json();

  const forecast = data.list[0];

  return {
    weather: forecast.weather[0].description,
    temp: Math.round(forecast.main.temp),
    humidity: forecast.main.humidity,
    rain: Math.round((forecast.pop || 0) * 100)
  };
}

function getClothesAdvice(temp) {
  if (temp >= 32) {
    return "短袖短裤，注意防晒和补水";
  }

  if (temp >= 26) {
    return "短袖即可，建议携带雨伞";
  }

  if (temp >= 20) {
    return "长袖或薄外套";
  }

  if (temp >= 15) {
    return "外套加长裤";
  }

  return "建议穿厚外套";
}

async function main() {
  const token = await getAccessToken();

  const weatherInfo = await getWeather();

  const advice = getClothesAdvice(weatherInfo.temp);

  const body = {
    touser: OPENID,
    template_id: TEMPLATE_ID,
    data: {
      city: {
        value: "厦门"
      },
      weather: {
        value: weatherInfo.weather
      },
      temp: {
        value: `${weatherInfo.temp}℃`
      },
      rain: {
        value: `${weatherInfo.rain}%`
      },
      cloth: {
        value: advice
      },
      time: {
        value: new Date().toLocaleString("zh-CN")
      }
    }
  };

  const response = await fetch(
    `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  const result = await response.json();

  console.log(result);
}

main();
