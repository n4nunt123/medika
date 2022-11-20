import { useEffect, useState } from 'react'
import { Text, View, Alert, StyleSheet, Image, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import ScheduleCard from '../components/scheduleCard'
import AsyncStorage  from '@react-native-async-storage/async-storage'


export default function HistoryScreen({ navigation }) {
  const [dataUserSchedule, setUserSchedule] = useState([])
  const [dataUser, setDataUser] = useState({})

  const getDataDoctors = async () => {
    try {
      const jsonValue = JSON.parse(await AsyncStorage.getItem("@storage_key"))
      const { data } = await axios({
        url: 'http://192.168.1.8:4001/schedule-users/user',
        method: 'GET',
        data: { id: jsonValue }
      })
      setUserSchedule(data)
    } catch (err) {
      Alert.alert("Opps!", "Something error")
    }
  }

  const getDataUser = async () => {
    try {
      const jsonValue = JSON.parse(await AsyncStorage.getItem("@storage_key"))
      const { data } = await axios({
        url: `http://192.168.1.8:4001/users/${jsonValue.id}`,
        method: 'GET'
      })
      setDataUser(data)
    } catch (err) {
      Alert.alert("Opps!", err.message)
    }
  }

  useEffect(() => {
    getDataDoctors()
    getDataUser()
    console.log(dataUserSchedule)
  }, [])

  return (
    <SafeAreaView style={style.container}>
      <View style={style.customCard}>
        <View style={style.imageCardContainer}>
          <Image 
            source={{ uri: 'https://cdn.discordapp.com/attachments/1007286935926095954/1043044937211584602/unknown.png' }}
            style={style.imageCard}
          />
        </View>
        <View style={style.contentCard}>
          <View style={style.titleCard}>
            <Text style={style.titleTextCard}>Tn. {dataUser.fullName}</Text>
          </View>
          <View style={style.descriptionCard}>
            <Text>Umur: {dataUser.age} tahun</Text>
            <Text>Jenis Kelamin: {dataUser.gender}</Text>
          </View>
          <Text></Text>
          <Text>Email: {dataUser.email}</Text>
        </View>
      </View>

      <View style={{ flex: 3, alignItems: 'center', marginTop: '8%'  }}>
        <View style={{ marginBottom: 20 }}>
          <Button 
            title='Daftar Kunjungan Bru'
            color='blue'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <Text style={style.homeText}>Daftar Riwayat Kunjungan</Text>
        { dataUserSchedule.length !== 0 ? dataUserSchedule.map(el => <ScheduleCard doctor={el} key={el.id} />) : <Text>Hello {dataUser.fullName}. Kamu belum memiliki history kunjungan</Text> }
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  homeText: {
    marginBottom: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  customCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    padding: 3,
    borderRadius: 12,
    width: 400,
    height: 125,
    marginTop: '8%' 
  },
  imageCardContainer: {
    paddingRight: 15,
    marginRight: 7.6,
    marginLeft: 7.6,
    marginTop: 'auto',
    marginBottom: 'auto',
    width: 100
  },
  imageCard: {
    width: 100,
    height:100,
    resizeMode: 'contain'
  },
  contentCard: {
    padding: 6,
    marginRight: 5,
    marginLeft: 5,
    width:210
  },
  titleCard: {
    marginTop: 10,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomColor: '#d2706d',
    borderBottomWidth: 0.2
  },
  titleTextCard: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#d2706d',
  },
  descriptionCard: {
    marginBottom: 3,
  }
})