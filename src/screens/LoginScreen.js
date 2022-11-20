import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View, Pressable, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_key")
      return jsonValue !== null ? navigation.navigate('Content') : navigation.navigate('Login')
    } catch (err) {
      Alert.alert("Opps!", err.message)
    }
  }

  const loginData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      if(!jsonValue) throw { message: 'Something error' }
      await AsyncStorage.setItem("@storage_key", jsonValue)
    } catch (err) {
      Alert.alert("Opps!", err.message)
    }
  }

  const login = async () => {
    try {
      if(!email) throw { message: 'Please input your email' }
      if(!password) throw { message: 'Please input your password' }
      const { data } = await axios({
        url: 'http://192.168.1.8:4001/users/login',
        method: 'POST',
        data: { email, password }
      })
      await loginData({ id: data.id, access_token: data.access_token })
      navigation.navigate({ name: 'Front' })
    } catch (err) {
      if(err.status == 404) Alert.alert("Opps!", "Invalid email/password")
      else Alert.alert("Opps!", "Something error")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView style={style.container}>
      <View style={ style.title }>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>LOGIN</Text>
      </View>
        <TextInput
          style={ style.input }
          onChangeText={ setEmail }
          value={ email }
          placeholder="Email" />
        <TextInput
          style={ style.input }
          onChangeText={ setPassword }
          value={ password }
          placeholder="Password"
          secureTextEntry={ true }
        />
        <TouchableHighlight
          onPress={() => login()}
          style={ style.submit }
          underlayColor="#fff"
        >
          <Text style={ style.submitText }>Login</Text>
        </TouchableHighlight>
        <View style={ style.control }>
          <Text style={ style.desc }>Don't have an account yet? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={ [ style.desc, { color: "#d2706d" } ] }>Sign Up</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 20,
    marginTop: 50
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center'
  },
  input: {
    height: 45,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    color: "#4c4b49"
  },
  desc: {
    color: "black",
    fontSize: 18,
  },
  submit: {
    borderRadius: 40,
    backgroundColor: "#d2706d",
    width: 80,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "70%",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
  },
  control: {
    flexDirection: "row",
    marginTop: 200,
    marginLeft: 70,
  },
});