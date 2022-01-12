/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {BloodTest} from './src/components/bloodTest';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

  return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName={"BloodTest"}>
            <Stack.Screen
               name="BloodTest"
               component={BloodTest}
               options={{ title: 'Submit blood test results',
                   headerTintColor: '#000',
                   headerTitleAlign: 'center',
                   headerTitleStyle: {
                    fontSize: 24
                   },
                   contentStyle: {
                    backgroundColor: '#fff',
                   }

               }}
              />
         </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
