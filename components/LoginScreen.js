import React from 'react';
import { StyleSheet, Text, Pressable, TextInput, View, Image } from 'react-native';
export default function LoginScreen({navigation}) {
  return (
    <View style={styles.main}>
      <Image source={require("../assets/logo.png")} style={ styles.logo } />
      <View style={styles.textContainer}>
        <TextInput
          style={styles.input}
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
          placeholder="Password"
          autoComplete="password"
          secureTextEntry
          placeholderTextColor="#777"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
        <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
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