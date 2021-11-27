import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FAB } from 'react-native-elements';

const DiaryItem = (props) => {
  const createdAt = props.diary.createdAt;
  const dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ];
  const createdAtString = `${createdAt.getFullYear()}/${createdAt.getMonth()+1}/${createdAt.getDate()}(${dayOfWeekStrJP[createdAt.getDay()]})`;
  const image = props.diary.image

  return (
    <View style={styles.diaryItem}>
      <Image resizeMode="contain" source={require("../assets/logo.png")} style={ styles.diaryImage} />
      <View style={styles.diaryTexts}>
        <Text style={styles.diaryDate}>{createdAtString}</Text>
        <Text style={styles.diaryTitle}>{props.diary.title}</Text>
      </View>
    </View>
  );
}

export default function DiaryListScreen(navigation) {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const diaries = [];
    for (let i = 0; i < 20; i++) {
      diaries.push({
        uid: i,
        title: `タイトル${i}`,
        body: `本文${i}`,
        createdAt: new Date(),
      })
    }
    setDiaries(diaries);
  }, []);


  const renderDiaries = () => diaries.map(
    diary => 
      <DiaryItem 
        key={diary.uid} 
        diary={diary}
        navigation={navigation}
      />
  )
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        {renderDiaries()}
      </ScrollView>
      <FAB placement="right" color="#fff"
        icon={
          {
            name:'plus',
            type:'font-awesome',
            color:'#555',
          }
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#c5f0e7",
    padding:16,
  },
  diaryItem: {
    flexDirection: "row",
  },
  diaryTexts: {
    justifyContent: "center",
  },
  diaryTitle: {
    fontSize: 24,
  },
  diaryDate: {
    fontSize: 12,
    color: "#555555",
  },
  diaryImage: {
    width: 64,
    height: 64,
  },
});