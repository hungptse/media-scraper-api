FROM selenium/node-chrome:131.0

USER root


WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]
