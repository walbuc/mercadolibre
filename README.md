# mercadolibre

Project Deployed to:

https://mercadolibre-jkfxhqrjdf.now.sh/

Client built in React using Suspense, react cache and graphql.

The backend serves the react app through the express module.

There is also a graphql server that comunicates with Mercadolibre api.

Local development:

Install server and client dependencies
```
yarn install 
yarn install --prefix client
```

```
yarn run dev
```
This command will run the webpack development server concurrently with the graphql server and proxy the requests from react client to the server.

```
yarn run build
yarn start
```

This commands will prepare the project to deploy, install all the dependencies and then serve the application.
