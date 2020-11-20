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
    }

    # Query type lists all available queries that clients can execute, along with the return type for each.

    type Query {
        weather: [Weather]
    }

`
