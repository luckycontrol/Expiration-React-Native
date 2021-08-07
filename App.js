import React from 'react';
import Login from './screens/account/Login';
import CreateAccount from './screens/account/CreateAccount';
import Main from './screens/main/Main';
import Add from './screens/main/add/Add';
import Edit from './screens/main/edit/Edit';
import CameraView from './screens/main/camera/CameraView';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';

export default function App() {

  return (
      <Provider store={store}>
          <Root />
      </Provider>
  );
}

function Root() {

    const Stack = createStackNavigator();

    const login = useSelector((state) => state.account.state);

    return (
        <NavigationContainer>
            {
                login ? (
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name="Main" component={Main} />
                        <Stack.Screen name="Add" component={Add} />
                        <Stack.Screen name="Edit" component={Edit} />
                        <Stack.Screen name="Camera" component={CameraView} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    )
}