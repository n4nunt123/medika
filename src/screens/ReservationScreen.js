import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, SafeAreaView, TextInput, TouchableHighlight } from "react-native";
import { Picker } from '@react-native-picker/picker'
import AsyncStorage  from '@react-native-async-storage/async-storage'
import axios from 'axios'

const ReservationScreen = ({ navigation }) => {
  const [dataDoctor, setDataDoctor] = useState([])
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [doctorScheduleStart, setdoctorScheduleStart] = useState('')
  const [doctorScheduleEnd, setdoctorScheduleEnd] = useState('')
  const [doctorSpecialist, setdoctorSpecialist] = useState('')
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const getDataDoctors = async () => {
    try {
      const { data } = await axios({
        url: 'http://192.168.1.8:4001/doctors/',
        method: 'GET'
      })
      setDataDoctor(data)
    } catch (err) {
      Alert.alert("Opps!", "Something error")
    }
  }

  const daftar = async () => {
    try {
      if(!selectedDay) throw { message: 'Please select your day' }
      if(!selectedDoctor) throw { message: 'Please select your doctor' }
      if(!fullName) throw { message: 'Please input your name' }
      if(!age) throw { message: 'Please input your age' }
      if(!Number(age)) throw { message: 'Invalid age input' }
      if(!gender) throw { message: 'Please choose your gender' }
      if(!phoneNumber) throw { message: 'Please input your phone number' }
      if(!Number(phoneNumber)) throw { message: 'Invalid phone number input' }
      if(!address) throw { message: 'Please input your address' }

      const { id } = JSON.parse(await AsyncStorage.getItem("@storage_key"))

      // add new schedule
      await axios({
        url: `http://192.168.1.8:4001/schedule-users/`,
        method: 'POST',
        data: { 
          fullName, 
          age, 
          gender, 
          phoneNumber, 
          address, 
          day: selectedDay, 
          doctor: selectedDoctor,
          doctorScheduleStart,
          doctorScheduleEnd,
          doctorSpecialist,
          userId: id
        }
      })

      navigation.navigate({ name: 'History' })
      setSelectedDay('')
      setSelectedDoctor('')
      setdoctorScheduleStart('')
      setdoctorScheduleEnd('')
      setdoctorSpecialist('')
      setFullName('')
      setAge('')
      setGender('')
      setPhoneNumber('')
      setAddress('')
    } catch (err) {
      Alert.alert("Opps!", err.message)
    }

  }
  
  useEffect(() => {
    getDataDoctors()
  }, [])
  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Daftar Reservasi Baru</Text>
        <TextInput
          style={ style.input }
          onChangeText = { setFullName }
          value = { fullName }
          placeholder = 'Input your name here...'
        />
        <TextInput 
          style={ style.input }
          onChangeText = { setAge }
          value = { age }
          placeholder = 'Input your age here...'
        />
        <Picker
          selectedValue={ gender }
          style={ style.input }
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Select Your Gender..." value="" />
          <Picker.Item label="Laki - laki" value="L" />
          <Picker.Item label="Perempuan" value="P" />
        </Picker>
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
        <Picker
          selectedValue={selectedDay}
          style={ style.input }
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
        >
          <Picker.Item label="Select Your Day..." value="" />
          <Picker.Item label="Senin" value="Senin" />
          <Picker.Item label="Selasa" value="Selasa" />
          <Picker.Item label="Rabu" value="Rabu" />
          <Picker.Item label="Kamis" value="Kamis" />
          <Picker.Item label="Jum'at" value="Jum'at" />
        </Picker>
        <Picker
          selectedValue={selectedDoctor}
          style={ style.input }
          onValueChange={(itemValue, itemIndex) => {
              return [
                setSelectedDoctor(itemValue.fullName),
                setdoctorScheduleEnd(itemValue.scheduleEnd),
                setdoctorScheduleStart(itemValue.scheduleStart),
                setdoctorSpecialist(itemValue.specialist)
              ]
            }
          }
        >
          <Picker.Item label="Select Your Doctor..." value="" />
          { dataDoctor.length != 0 ? dataDoctor.map(el => <Picker.Item label={el.fullName} value={el} />) : null}
        </Picker>
        { selectedDoctor ? dataDoctor.map(el => {
          if(el.fullName === selectedDoctor) {
            return (
              <>
                <View style={style.input}><Text>Dokter Specialis: {el.specialist}</Text></View>
                <View style={style.input}><Text>Jam Praktek: {el.scheduleStart} - {el.scheduleEnd}</Text></View>
              </>
            )
          }
        }) : null}
        <View style={{flexDirection: "row-reverse"}}>
          <TouchableHighlight onPress={() => daftar()} style={style.submit} underlayColor='#FFF'>
            <Text style={{ color: '#FFF' }}>Daftar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
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
});

export default ReservationScreen;