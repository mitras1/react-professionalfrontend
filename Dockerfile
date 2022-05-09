FROM mhart/alpine-node

COPY ./build /app

WORKDIR /app

RUN npm install http-server --save

WORKDIR /app

ENTRYPOINT ["./node_modules/.bin/http-server"]
