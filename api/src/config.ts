const config = {
  apiPort: process.env.API_PORT || 3030,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/movies'
};

export default config;