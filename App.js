import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import DiaryListScreen from './components/DiaryListScreen';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#a7ccc4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={DiaryListScreen}
          options={{
            ...headerOptions,
            title: '日記一覧',
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            ...headerOptions,
            title: 'ログイン画面',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;