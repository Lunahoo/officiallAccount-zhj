FROM 192.168.1.8/prod/nginx:latest
MAINTAINER Tymon Tian <tianyang@jia-fu.cn>

# 安装编译包
ADD ./dist/ /usr/share/nginx/html/
ADD ./config/MP_verify_zaQaMATN3NfrzcPq.txt /usr/share/nginx/html/
ADD ./config/MP_verify_kpBTT56wQJFv4W3K.txt /usr/share/nginx/html/
ADD ./config/HzohPsQ8TG.txt /usr/share/nginx/html/

EXPOSE 80
