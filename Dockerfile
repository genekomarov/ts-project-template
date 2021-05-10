FROM node:14.16

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY /home/dockeruser01/projects/finman/finman-serv/ /usr/src/app/

CMD ["npm", "start"]