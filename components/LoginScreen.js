import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, TextInput, View, Image } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from '../Config';
import { UserContext } from '../contexts/UserContext';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = React.useContext(UserContext);

  // ユーザ登録
  const signUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user;
  }

  // メール＆パスワードログイン
  const login = async() => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  return (
    <View style={styles.main}>
      <Image source={require("../assets/logo.png")} style={ styles.logo } />
      <View style={styles.textContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholderTextColor="#777"
          />
      </View>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          autoComplete="password"
          secureTextEntry
          placeholderTextColor="#777"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}
          onPress={() => {
            login()
            .then( user => {
              setUser(user);
              navigation.navigate("Home");
            }).catch(error => {
              console.log(error);
            });
          }}
        >
        <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            signUp()
              .then( user => {
                setUser(user);
                navigation.navigate("Home");
              })
              .catch( error => {
                console.log(error);
              });
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
)}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
  },
  main: {
    flex: 1,
    height: "100%",
    backgroundColor: "#c5f0e7",
    alignItems: "center",
    justifyContent: "center",
    padding:32,
  },
  textContainer:{
    width: '100%',
    marginVertical: 12,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#eeeeee",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonContainer: {
    width: "100%",
    paddingTop: 16,
  }
});