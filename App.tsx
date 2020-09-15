import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import createLocalStore from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Spaces from './src/screens/Spaces';
import {AlertsProvider} from './src/context/AlertsContext';

// Disable console.log in prod
if (!__DEV__) {
  console.log = () => {};
}

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Spaces" component={Spaces} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    createLocalStore().then((result) => {
      const newStore = result;
      setStore(newStore);
    });
  }, []);

  if (!store) return null;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AlertsProvider>
          <StoreProvider store={store}>
            <MainStack />
          </StoreProvider>
        </AlertsProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
