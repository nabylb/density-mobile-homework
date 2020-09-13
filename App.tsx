import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Spaces from './src/screens/Spaces';
import {AlertsProvider} from './src/context/AlertsContext';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Spaces" component={Spaces} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AlertsProvider>
          <MainStack />
        </AlertsProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
