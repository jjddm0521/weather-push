console.log("Start");

const APPID = process.env.WX_APPID;
const SECRET = process.env.WX_SECRET;

async function test() {

  const url =
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;

  const response = await fetch(url);

  const data = await response.json();

  console.log(data);
}

test();
