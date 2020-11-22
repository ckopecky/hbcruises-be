require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

//REST DataSource

class WeatherAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = 'http://api.openweathermap.org/data/2.5/';
	}

	async getWeather(postalCode) {
		console.log('get', postalCode.zip);
		let response = await this.get(
			`weather?zip=${postalCode.zip}&units=imperial&appid=${process.env.API_KEY}`
        );
        if(response) {
            return response;
        }
		return null;
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
        lat: String
        lon: String
        cloud_cover: String
        id: String
        icon: String
    }

    # Query type lists all available queries that clients can execute, along with the return type for each.

    type Query {
        weather(zip: String): [Weather]
    }

`;

//resolver --- how to fetch data

const resolvers = {
	Query: {
		weather: async (_, zip, { dataSources }) => {
            try {
                let response = await dataSources.weatherAPI
                .getWeather(zip);
                    console.log(response)
                return [
                    {
                        city: response.name,
                        conditions: response.weather[0].main,
                        description: response.weather[0].description,
                        temperature: response.main.temp,
                        feels_like: response.main.feels_like,
                        temp_hi: response.main.temp_max,
                        temp_low: response.main.temp_min,
                        humidity: response.main.humidity,
                        wind_speed: response.wind.speed,
                        lat: response.coord.lat,
                        lon: response.coord.lon,
                        cloud_cover: response.clouds.all,
                        id: response.id,
                        icon: response.weather[0].icon
                    },
				];
            }
			catch (error) {
                    return [{ error: true, message: error.message }];
                }	
		},
	},
};

//create instance of apollo server

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => {
		return {
			weatherAPI: new WeatherAPI(),
		};
	},
    cors: {
		origin: "*", //[ "https://studio.apollographql.com", "https://weather-app-ck-fe.vercel.app/", "http://localhost:4000" ],		// allow request from prod and dev domains
		credentials: true},
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
    🚀 Server ready at ${url} 🚀
    `, `
    node-environment: ${process.env.NODE_ENV}`
    );
  });
  