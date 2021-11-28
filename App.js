import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/LoginScreen';
import DiaryListScreen from './components/DiaryListScreen';
import RegisterDiaryScreen from './components/RegisterDiaryScreen';
import { DiaryDetailScreen } from './components/DiaryDetaliScreen';

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
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            ...headerOptions,
            title: 'ログイン',
          }}
        />
        <Stack.Screen
          name="Home"
          component={DiaryListScreen}
          options={{
            ...headerOptions,
            title: '日記一覧',
          }}
        />
        <Stack.Screen name="Detail" component={DiaryDetailScreen}
          options={{
            ...headerOptions,
            title: '日記',
          }}
        />
        <Stack.Screen name="Register" component={RegisterDiaryScreen}
          options={{
            ...headerOptions,
            title: '日記作成',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;