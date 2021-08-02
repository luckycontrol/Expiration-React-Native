import React from 'react';
import Login from './screens/account/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './screens/account/CreateAccount';
import ProductList from './screens/main/list/ProductList';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './screens/main/Main';
import Add from './screens/main/add/Add';

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
          <Stack.Screen name="List" component={Main} />
          <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}