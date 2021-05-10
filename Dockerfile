FROM node:14.16

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY . /usr/src/app/

CMD ["npm", "start"]