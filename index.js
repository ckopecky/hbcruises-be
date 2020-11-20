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



