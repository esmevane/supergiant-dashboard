FROM mhart/alpine-node:5.10

ADD . .
RUN apk add --no-cache git make gcc g++ python
RUN rm -rf node_modules && npm install

# Default ENV
ENV NODE_ENV=production
ENV SG_API_HOST=http://localhost
ENV SG_API_PORT=8080

EXPOSE 9001
CMD ["npm", "run", "serve"]
