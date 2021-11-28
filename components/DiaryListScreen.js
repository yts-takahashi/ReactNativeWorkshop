import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity,　RefreshControl, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FAB } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { DBContext } from '../contexts/DBContext';

const DiaryItem = (props) => {
  const createdAt = props.diary.createdAt;
  const dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ];
  const createdAtString = `${createdAt.getFullYear()}/${createdAt.getMonth()+1}/${createdAt.getDate()}(${dayOfWeekStrJP[createdAt.getDay()]}) ${createdAt.getHours()}:${("00"+createdAt.getMinutes()).slice(-2)}`;

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Detail', { diary: props.diary })
    }>
      <View style={styles.diaryItem}>
        <Image resizeMode="contain" source={{ uri: props.diary.image }} style={ styles.diaryImage} />
        <View style={styles.diaryTexts}>
          <Text style={styles.diaryDate}>{createdAtString}</Text>
          <Text style={styles.diaryTitle}>{props.diary.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function DiaryListScreen({navigation}) {
  const [diaries, setDiaries] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const { db } = React.useContext(DBContext);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(query(collection(db, `diaries`), orderBy("createdAt", "desc")))
      const diaries = []
      querySnapshot.forEach((doc) => {
        diaries.push({
          uid: doc.id,
          title: doc.get("title"),
          body: doc.get("body"),
          image: doc.get("image"),
          createdAt: doc.get("createdAt").toDate(),
        })
      });
      setDiaries(diaries);
    })();

    navigation.addListener(
      'willFocus',
      payload => {
        this.forceUpdate();
      }
    );
  }, [isFocused]);

  const refreshDiaries = React.useCallback(() => {
    setRefreshing(true);
    (async () => {
      const querySnapshot = await getDocs(query(collection(db, `diaries`), orderBy("createdAt", "desc")))
      const diaries = []
      querySnapshot.forEach((doc) => {
        diaries.push({
          uid: doc.id,
          title: doc.get("title"),
          body: doc.get("body"),
          image: doc.get("image"),
          createdAt: doc.get("createdAt").toDate(),
        })
      });
      setDiaries(diaries);
      setRefreshing(false);
    })();
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshDiaries}
          />
        }
      >
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
        onPress={() => {navigation.navigate("Register")}}
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
