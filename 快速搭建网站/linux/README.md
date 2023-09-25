# 快速搭建网站-服务器篇
## 阿里云回馈用户，云产品1折起
阿里云回馈用户，云产品1折起💰 https://www.aliyun.com/minisite/goods?userCode=knarkhg5&share_source=copy_link
## 阿里云域名注册 
https://wanwang.aliyun.com/?spm=5176.21213303.1158081.1.119153c9Tb2fYe&scm=20140722.S_card@@%E5%95%86%E5%93%81@@212429.S_card0.ID_card@@%E5%95%86%E5%93%81@@212429-RL_%E5%9F%9F%E5%90%8D-OR_ser-V_2-P0_1


## nginx 安装
1. cd /
2. yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
3. 下载 http://nginx.org/download/nginx-1.8.1.tar.gz
4. tar -zxvf ./nginx-1.8.1.tar.gz 
5. cd ./nginx-1.8.1
6. ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
7. make && make install
8. cd /usr/local/nginx/sbin/
9. firewall-cmd --zone=public --add-port=80/tcp --permanent
10. 重启动防火墙 firewall-cmd --reload

## 端口开放
1. 开放阿里云平台端口
2. 开放服务器端口

## https 证书申请
### 阿里云证书申请
> 下载

1. curl https://get.acme.sh | sh
2. 安装 socat：yum install socat
3. alias acme.sh=~/.acme.sh/acme.sh

> 开放80端口并关闭80服务

1. centos firewall-cmd --zone=public --add-port=80/tcp --permanent
* 重启动防火墙 firewall-cmd --reload
1. ubantu 开放80端口：ufw allow 80
* 重启动防火墙 sudo ufw reload

> 证书注册  domain.com 换成你域名，xxx@qq.com 换成你自己的邮箱。
1. acme.sh --register-account -m xxx@qq.com

> 国外域名证书申请
1. acme.sh --issue -d domain.com  --standalone -k ec-256 

> 国内阿里云，腾讯云 需要先获取 accessKey 
```
阿里云绑定key
export Ali_Key=""
export Ali_Secret=""
acme.sh --issue -d domain.com --dns dns_ali --standalone -k ec-256
```
> 安装证书 到 /cer 路径。

1. mkdir /cer
2. acme.sh --installcert -d domain.com --ecc  --key-file  /cer/server.key   --fullchain-file /cer/server.crt

> 更新证书
1. acme.sh --renew -d doman.com --dns dns_ali --standalone -k ec-256 --force