/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import SplashScreen from './src/Components/SplashScreen';
import LoginScreen from './src/Components/LoginScreen';
import HomeScreen from './src/Components/HomeScreen';

AppRegistry.registerComponent(appName, () => App);