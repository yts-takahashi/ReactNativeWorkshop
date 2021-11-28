import React from 'react';
import { Text, View } from 'react-native';

export const DiaryDetailScreen = ({ route }) => {
  return (
    <View>
      <Text>{route.params.diary.title}</Text>
      <View><Text>{route.params.diary.body}</Text></View>
    </View>
  );
};
