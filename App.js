import React, { useEffect } from 'react';
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
import { login as LOGIN_REDUCER } from './features/Account/accountSlice';
import { useSelector, useDispatch } from 'react-redux';

import db, { createDatabase } from './sqlite/sqlite';

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

    const dispatch = useDispatch();

    useEffect(() => {
        createDatabase(db);

        db.transaction(tx => {
            tx.executeSql("select * from status where id = 1;", [], ( _, { rows: { _array }}) => {
                if (_array.length <= 0) { return; }

                if (_array[0].status === 1) {
                    dispatch(LOGIN_REDUCER({ name: _array[0].name, email: _array[0].email }));
                }
            })
        })

    }, [])

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