# Weather App CK - Backend

**Summary**: Basic Weather API using Apollo-Server and GraphQL. 
## Deployment
Server: [Weather App CK Backend](https://weather-app-ck-be.herokuapp.com/)


Backend Built Using:
GraphQL and Apollo-Server

Dependencies:

    "apollo-datasource-rest": "^0.9.5",
    "apollo-server": "^2.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "graphql": "^15.4.0"

DevDependencies: 
    
    "nodemon": "^2.0.6"


Deployed By: [Heroku](https://www.heroku.com/) and [Apollo Studio](https://studio.apollographql.com/)

### Environmental Variables

You will need to create an API Key for Open Weather's API to use it. 

**development env variables**
```
API_KEY=<INSERT API KEY FROM OPENWEATHER>
NODE_ENV=development
```

**production env variables**

```
API_KEY=<INSERT API KEY FROM OPENWEATHER>
NODE_ENV=production
APOLLO_KEY=<INSERT KEY FROM PROD GRAPH ON APOLLO STUDIO>
APOLLO_GRAPH_VARIANT=current
APOLLO_SCHEMA_REPORTING=true

```
When deploying an Apollo graph in production, you can keep track of some metrics with the additional variables. 

### GraphQL Schemas:

```gql
type Weather {
    city: String
    temperature: String 
    conditions: String
    description: String
    feels_like: String
    temp_hi: String
    temp_low: String
    humidity: String
    wind_speed: String
    error: Boolean
    message: String
    zip: String
    lat: String
    lon: String
    cloud_cover: String
    id: String
    icon: String
}

type Query {
    weather(zip: String): [Weather]
}
```
The Weather typedef was pulled from [OpenWeatherMap](https://openweathermap.org/current). 

Use the API Documentation on the site to decide what properties you would like to include as part of your query. For this project, the degrees were set to be `imperial` -- Fahrenheit. 

The zipcode was used here to make the query. Passing the zip from the form submission as a variable in the query was imperative for the API call to work on the backend. 

The Query typedef expects a zipcode string as an argument and returns an array of objects that contain the properties and values that is contained in the Weather typedef. 

This project only queries one zipcode lookup, but there can be several. If you incorporate a database into this project, you can customize the application to fit the user's needs and adjust the URL you make the call to. 

### Using the Application
Requirements:

* Node
* Package Manager (such as Yarn or npm)
Yarn was used to build this project.


Have Node? Have Yarn or npm? Follow these steps:

1. Fork and clone repo

2. Run `yarn install` to install the necessary `node_modules` on the frontend.

3. Create an `.env` file and put it in the root of your project. Be sure to add a `.gitignore` file if one is not already created so the `.env` file can be added. This should **NOT** be pushed to version control. 

4. Add necessary enviromental variables that are listed above.

4. Run `yarn start` to start the development server  on `http://localhost:4000`

5. Head over to [Apollo Studio](https://studio.apollographql.com/), Create an Account, and create a Development Graph. Be sure to point it to your local endpoint. 


Your application is now running and can be tested locally.