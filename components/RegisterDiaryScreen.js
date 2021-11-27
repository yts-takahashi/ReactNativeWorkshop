import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

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
  
const RegisterDiaryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addDiary = (db, title, body) => {
    addDoc(collection(db, "diaries"), {
      title: title,
      body: body,
      createdAt: Timestamp.now(),
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>題名</Text>
      <TextInput
        label="題名"
        style={styles.titleInput}
        autoCapitalize="none"
        placeholder="最高の一日！"
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.label}>本文</Text>
      <TextInput
        label="本文"
        style={styles.bodyInput}
        autoCapitalize="none"
        multiline
        placeholder="今日は非常に目覚めもよく、朝から快晴で気持ちの良い一日でした。"
        onChangeText={text => setBody(text)}
      />
      <Button
        title="保存"
        color="#DF81A2"
        onPress={async () => {
            await addDiary(db, title, body);
            navigation.navigate('Home');
          }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#c5f0e7",
    padding:16,
  },
  label: {
    marginTop: 8,
  },
  titleInput: {
    height: 40,
  },
  bodyInput: {
    flexGrow: 1,
    marginBottom: 16,
  },
});

export default RegisterDiaryScreen