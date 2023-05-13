// 控制应用生命周期和创建原生浏览器窗口的模组
import { app, BrowserWindow, Tray, Menu, screen } from "electron";
import path from "path";
import "./mainhandle";
let mainWindow: BrowserWindow;

async function createWindow(width: number, height: number): Promise<void> {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 336,
    height: 153,
    x: width - 340,
    y: height - 155,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar:true,
    webPreferences: {
      // 引入预加载文件
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 判断当前环境是否为开发环境
  if (process.env.NODE_ENV === "development") {
    // 当处于开发环境时，页面加载本地服务，并自动打开开发者工具
    mainWindow.loadURL("http://localhost:5173");

    mainWindow.webContents.openDevTools();
  } else {
    // 否则页面加载打包后的index.html文件
    mainWindow.loadFile(path.join(__dirname, "./index.html"));
  }
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(async () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  createWindow(width, height);

  const tray = new Tray(path.join(__dirname, "../assets/img/tray.png"));
  const contextMenu: Menu = Menu.buildFromTemplate([
    {
      click: () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      },
      label: "显示/隐藏",
      type: "normal",
    },
    {
      click: () => {
        app.quit();
      },
      label: "退出",
      type: "normal",
    },
  ]);
  tray.setToolTip("checkIn");
  tray.setContextMenu(contextMenu);

  app.on("activate", function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow(width, height);
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
