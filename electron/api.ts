import axios from "axios";
import * as Cheerio from "cheerio";
interface ItrafficInfo {
  lastUsedTraffic: string;
  todayUsedTraffic: string;
  unUsedTraffic: string;
}

interface Idata {
  msg: string;
  ret: number;
  traffic?: string;
  trafficInfo?: ItrafficInfo;
  unflowtraffic?: number;
}

export async function checkIn(Cookie: string): Promise<Idata> {
  const res = await axios.request({
    url: "https://w1.v2free.top/user/checkin",
    method: "POST",
    headers: {
      accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39",
      Cookie,
      Referer: "https://w1.v2free.top/user",
    },
  });

  return res.data;
}

export async function getData(Cookie: string): Promise<ItrafficInfo> {
  const res = await axios.request({
    url: "https://w1.v2free.top/user",
    method: "GET",
    headers: {
      accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39",
      Cookie,
      Referer: "https://w1.v2free.top/user",
    },
  });
  const $ = Cheerio.load(res.data);
  return {
    todayUsedTraffic: $("code.card-tag.tag-red").text(),
    lastUsedTraffic: $("code.card-tag.tag-orange").text(),
    unUsedTraffic: $("code.card-tag.tag-green").text(),
  };
}
