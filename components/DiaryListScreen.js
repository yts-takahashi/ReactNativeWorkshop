import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { FAB } from 'react-native-elements';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";

// 以下は、アプリケーションをFirebaseに追加した際に表示されたものを利用しましょう。
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECKT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const DiaryItem = (props) => {
  const createdAt = props.diary.createdAt;
  const dayOfWeekStrJP = [ "日", "月", "火", "水", "木", "金", "土" ];
  const createdAtString = `${createdAt.getFullYear()}/${createdAt.getMonth()+1}/${createdAt.getDate()}(${dayOfWeekStrJP[createdAt.getDay()]}) ${createdAt.getHours()}:${("00"+createdAt.getMinutes()).slice(-2)}`;

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

export default function DiaryListScreen({navigation}) {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(query(collection(db, `diaries`), orderBy("createdAt", "desc")))
      const diaries = []
      querySnapshot.forEach((doc) => {
        diaries.push({
          uid: doc.id,
          title: doc.get("title"),
          body: doc.get("body"),
          createdAt: doc.get("createdAt").toDate(),
        })
      });
      setDiaries(diaries)
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
