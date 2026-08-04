const APPID = process.env.WX_APPID;
const SECRET = process.env.WX_SECRET;
const OPENID = process.env.WX_OPENID;
const TEMPLATE_ID = process.env.WX_TEMPLATE_ID;
const WEATHER_KEY = process.env.WEATHER_KEY;

async function getAccessToken() {
  const url =
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.access_token;
}

async function getWeather() {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=Xiamen&appid=${WEATHER_KEY}&units=metric&lang=zh_cn`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    weather: data.weather[0].description,
    temp: data.main.temp
  };
}

async function main() {

  const token = await getAccessToken();

  const weatherInfo = await getWeather();

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
        value: weatherInfo.temp + "℃"
      },
      time: {
        value: new Date().toLocaleString("zh-CN")
      }
    }
  };

  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  const result = await res.json();

  console.log(result);
}

main();
