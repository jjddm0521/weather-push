console.log("Weather Push Started");
2
 
3
const APPID = process.env.WX_APPID;
4
const SECRET = process.env.WX_SECRET;
5
 
6
async function getAccessToken() {
7
 
8
const url =
9
`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;
10
 
11
const res = await fetch(url);
12
 
13
const data = await res.json();
14
 
15
console.log(data);
16
}
17
 
18
getAccessToken();
