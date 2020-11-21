require('dotenv').config();


const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

//REST DataSource

class WeatherAPI extends RESTDataSource {
    constructor(postalCode) {
        super();
        this.baseURL="http://api.openweathermap.org/data/2.5/"
        this.postalCode = postalCode
    }

    async getWeather(postalCode) {
        return this.get(`weather?zip=63701&units=imperial&appid=${process.env.API_KEY}`)
    }
}



//type definitions/schema

const typeDefs = gql`
    # Comments in GraphQL strings start with a hash symbol

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
    }

    # Query type lists all available queries that clients can execute, along with the return type for each.

    type Query {
        weather(zip: String): [Weather]
    }

`;

//resolver --- how to fetch data

const resolvers = {
    Query: {
        weather: async (_source, __, { dataSources }) => {
            return dataSources.weatherAPI.getWeather(weather.postalCode)
                .then(response => {
                    return [ {city: response.name, conditions: response.weather[0].main, description: response.weather[0].description, temperature: response.main.temp, feels_like: response.main.feels_like, temp_hi: response.main.temp_max, temp_low: response.main.temp_min, humidity: response.main.humidity, wind_speed: response.wind.speed} ];
                })
        }
    },
}

//create instance of apollo server

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            weatherAPI: new WeatherAPI()
        }
    }
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });