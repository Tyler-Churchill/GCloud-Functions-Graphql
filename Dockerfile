    
FROM node:8.12-alpine

ENV STAGE docker
WORKDIR /opt/app

# Install NPM dependencies
COPY package.json .
RUN npm i

COPY tsconfig.json .

COPY serverless-local.yml .
COPY src src/

CMD ["npm", "run", "offline:dev"]