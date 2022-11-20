import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View, Pressable, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const register = async () => {
    try {
      if(!fullName) throw { message: 'Please input your name' }
      if(!email) throw { message: 'Please input your email' }
      if(!password) throw { message: 'Please input your password' }
      if(!age) throw { message: 'Please input your age' }
      if(!gender) throw { message: 'Please choose your gender' }
      if(!phoneNumber) throw { message: 'Please input your phone number' }
      if(!Number(phoneNumber)) throw { message: 'Invalid phone number input' }
      if(!address) throw { message: 'Please input your address' }

      // register
      await axios({
        url: 'http://192.168.1.8:4001/users/register',
        method: 'POST',
        data: { fullName, email, password, age, gender, phoneNumber, address }
      })

      // login
      const { data } = await axios({
        url: 'http://192.168.1.8:4001/users/login',
        method: 'POST',
        data: { email, password }
      })

      await loginData({ id: data.id, access_token: data.access_token })
      navigation.navigate({ name: 'Front' })
    } catch (err) {
      console.log(err)
      Alert.alert("Opps!", err.message)
    }
  }

  const loginData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_key', jsonValue)
    } catch (err) {
      Alert.alert("Opps!", "Something Error")
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>REGISTER</Text>
        <TextInput 
          style={ [ style.input, { marginTop: 50 } ] }
          onChangeText = { setFullName }
          value = { fullName }
          placeholder = 'Input your name here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setEmail }
          value = { email }
          placeholder = 'Input your email here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setPassword }
          value = { password }
          secureTextEntry={ true }
          placeholder = 'Input your password here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setAge }
          value = { age }
          placeholder = 'Input your age here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setGender }
          value = { gender }
          placeholder = 'Input your gender here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setAddress }
          value = { address }
          placeholder = 'Input your address here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setPhoneNumber }
          value = { phoneNumber }
          placeholder = 'Input your phone number here...'
        />
        <View style={{flexDirection: "row-reverse"}}>
          <TouchableHighlight onPress={() => register()} style={style.submit} underlayColor='#FFF'>
            <Text style={{ color: '#FFF' }}>Register</Text>
          </TouchableHighlight>
        </View>
        <View style={ style.control }>
          <Text style={ style.desc }>Already have a account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={ [ style.desc, { color: "#d2706d" } ] }>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 20
  },
  input: {
    height: 45,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 30,
    width: '90%',
  },
  submit: {
    borderRadius: 40,
    backgroundColor: "#d2706d",
    width: 80,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: '60%',
    marginTop: 10
  },
  control: {
    flexDirection: "row",
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    color: "black",
    fontSize: 18,
  },
})