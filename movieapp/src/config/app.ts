import { Platform } from "react-native";

const config = {
  apiUrl: process.env.API_URL || 
  `http://${Platform.OS === 'android' ? '10.0.2.2' : 'localhost'}:3030`,
};

export default config;