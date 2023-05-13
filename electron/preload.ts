import { contextBridge, ipcRenderer } from "electron";
 


contextBridge.exposeInMainWorld("request", {
  doCheckIn: () => ipcRenderer.invoke("on-check-in"),
  doGetData: () => ipcRenderer.invoke("on-get-data"),
});
