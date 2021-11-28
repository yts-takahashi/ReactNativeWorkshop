import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Image, View, Button } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { DBContext } from '../contexts/DBContext';
import { UserContext } from '../contexts/UserContext';

const RegisterDiaryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const { uid } = React.useContext(UserContext);
  const { db } = React.useContext(DBContext);

  const addDiary = () => {
    addDoc(collection(db, `diaries_${uid}`), {
      title: title,
      body: body,
      image: image,
      createdAt: Timestamp.now(),
    })
  }

  const srcBase64Prefix = "data:image/gif;base64,";

  return (
    <View style={styles.container}>
      {image && <Image resizeMode="contain" source={{ uri: image }} style={ styles.image } />}
      <Button title="写真を選択" onPress={() => {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          base64: true,
          quality:  1,
        }).then(result => {
          if (!result) return;
          if (!result.cancelled) {
            setImage(`${srcBase64Prefix}${result.base64}`);
          }  
        });
      }} />
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
            await addDiary();
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
  image: {
    width: "100%",
    height: 128,
  },
});

export default RegisterDiaryScreen