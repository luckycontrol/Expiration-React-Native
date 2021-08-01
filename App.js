import React from 'react';
import Login from './components/account/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './components/account/CreateAccount';
import ProductList from './components/main/list/ProductList';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator
          screenOptions={
            { headerShown: false }
          }
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />

        </Stack.Navigator> */}
        <Stack.Navigator
          screenOptions={
            { headerShown: false }
          }
        >
          <Stack.Screen name="List" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}