import { ItrafficInfo } from "../index";
import { checkUnit } from "./checkUnit";

export const calcuProgress = (
  trafficInfo: ItrafficInfo
): {
  todayPro: string;
  lastPro: string;
  unPro: string;
} => {
  const todayVal = checkUnit(trafficInfo.todayUsedTraffic);
  const lastVal = checkUnit(trafficInfo.lastUsedTraffic);
  const unVal = checkUnit(trafficInfo.unUsedTraffic);

  const totalVal = lastVal + unVal;

  const todayPro = Math.round((todayVal / totalVal) * 100).toString() + "%";
  const lastPro = Math.round((lastVal / totalVal) * 100).toString() + "%";
  const unPro = Math.round((unVal / totalVal) * 100).toString() + "%";

  return {
    todayPro,
    lastPro,
    unPro,
  };
};
