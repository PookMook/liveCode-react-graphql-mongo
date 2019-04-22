# liveCode react+Gatsby/graphql/mongo

In browser vsCode using webcoder + templates microservices for react+Gatsby front-end, graphQL backend and Mongo database

## How to run

In order to kickstart the project, you need docker ([how to install](https://docs.docker.com/install/)) and docker-compose ([how to install](https://docs.docker.com/compose/install/)), then you can copy example docker-compose (contained in example_docker-compose/) 

### Local development

```
cp examples_docker-compose/standalone.docker-compose.yaml docker-compose.yaml
docker-compose up -d --build

```

### Behind a reverse DNS for online availability + https

```
cp examples_docker-compose/pininja.docker-compose.yaml docker-compose.yaml
docker-compose up -d --build

```