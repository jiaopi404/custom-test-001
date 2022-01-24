FROM nginx

# Copy application dist.
COPY . /usr/share/nginx/html
# RUN chmod -R 755 /usr/share/nginx
RUN chmod -R 755 /usr/share/nginx
COPY ./docker/default.conf /etc/nginx/conf.d/
COPY ./docker/nginx.conf /etc/nginx/
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Port
EXPOSE 80
