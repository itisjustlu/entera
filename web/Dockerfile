FROM node:20.10.0

ENV INSTALL_PATH /app
WORKDIR $INSTALL_PATH
COPY ./package.json $INSTALL_PATH/

RUN yarn install
COPY . $INSTALL_PATH
CMD ["yarn", "dev"]
