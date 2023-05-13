# 背景

由于科学上网的需求，需要用到v2rayN软件进行代理（不知道这个软件的小伙伴可以访问这个网址：https://w1.v2free.top/user ），由于该软件并不完全免费，每天通过签到可以免费获取300-400mb的流量，流量可以累计但五天未签到自动清空所有流量，本人抱着打死都不充钱的理念，便开发了这款自动签到软件，该软件通过启动自动完成当日签到并且可以实时监控流量使用情况，使用起来非常方便，再也不用担心流量不知不觉用超了。

# 使用

首先在assets->cookie->cookie.txt文件夹里把你的cookie填进去。
具体cookie怎么获取看如下示意图：

![Alt text](mdimg/cookie%E7%A4%BA%E6%84%8F%E5%9B%BE.jpg)

执行以下命令：

```cmd
npm i
npm run electron:build
```

即可得到build文件夹，其中：


`v2freecheckin Setup 0.0.0.exe` 是安装程序，也可以通过 `win-unpacked`文件夹下的`v2freecheckin.exe`直接打开。


# 软件界面

![Alt text](mdimg/%E8%BD%AF%E4%BB%B6%E7%95%8C%E9%9D%A2.jpg)

