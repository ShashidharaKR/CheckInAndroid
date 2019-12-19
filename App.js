import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/Components/SplashScreen';
import LoginScreen from './src/Components/LoginScreen';
import HomeScreen from './src/Components/HomeScreen';

const App: () => React$Node = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="splash"
          hideNavBar
          component={SplashScreen}
          title="splash"
          type="reset"
        />
        <Scene key="login"
          hideNavBar
          component={LoginScreen}
          title="login"
          type="reset"
        />
        <Scene
          key="home"
          hideNavBar
          initial
          component={HomeScreen}
          title="CheckIn"
          type="reset"
        />
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
