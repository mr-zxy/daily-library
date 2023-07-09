# clash 安装
> 官网
> https://github.com/Fndroid/clash_for_windows_pkg/releases
## 关闭Clash不当，导致无法上网
> clash 没有设置 开启自启动，但是本地代理还在代理127.0.0.1：7890
> 查看 clash 端口是否存在 netstat -ano | findstr 7890 
> 杀死进程 TASKKILL /F /PID 5944