import { Text, View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
 
export default function ScheduleCard(props) {
  return(
    <View style={style.customCard}>
      <View style={style.contentCard}>
        <View style={style.titleCard}>
          <Text style={style.titleTextCard}>Dr. {props.schedule.doctor}</Text>
          <Text style={style.titleTextCard}>Spesialis: {props.schedule.doctorSpecialist}</Text>
        </View>
        <View style={style.descriptionCard}>
          <Text>Nama Pasien: {props.schedule.fullName}</Text>
          <Text>Umur Pasien: {props.schedule.age}</Text>
          <Text>Jenis Kelamin Pasien: {props.schedule.gender}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Hari Praktek: {props.schedule.day}</Text>
          <Text>Jam Praktek: {props.schedule.doctorScheduleStart} - {props.schedule.doctorScheduleEnd}</Text>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  customCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    padding: 3,
    borderRadius: 12,
    width: 345
  },
  imageCardContainer: {
    paddingRight: 15,
    marginRight: 7.6,
    marginLeft: 7.6,
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
    marginTop: 2,
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
    marginTop: 5,
    marginBottom: 3,
  }
})