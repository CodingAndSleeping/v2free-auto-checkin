import { ipcMain } from "electron";
import { checkIn, getData } from "./api";
import path from "path";
import fs from "fs";

const decoder: TextDecoder = new TextDecoder("utf-8");
const cookieBuffer: Buffer = fs.readFileSync(
  path.resolve(__dirname, "../assets/cookie/cookie.txt")
);
const cookie: string = decoder.decode(cookieBuffer);



ipcMain.handle("on-check-in", async () => {
  const res = await checkIn(cookie);
  return res;
});

ipcMain.handle("on-get-data", async () => {
  const res = await getData(cookie);
  return res;
});
