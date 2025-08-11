FROM node:20-alpine

# Install git
RUN apk add --no-cache git

WORKDIR /app

COPY ["package.json", "./"]
RUN npm install --omit=dev

COPY . .

RUN addgroup -S hoyolab && adduser -S -G hoyolab hoyolab && \
    mkdir -p /app/data /app/logs /app/web-ui && \
    chown -R hoyolab:hoyolab /app 

USER hoyolab

ENV TZ=Asia/Shanghai

# Expose web UI ports
EXPOSE 3000 3001

CMD ["npm", "start"]
