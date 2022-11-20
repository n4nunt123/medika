import { Text, View, Image, StyleSheet } from 'react-native';

export default function DoctorCard(props) {
  return(
    <View style={style.customCard}>
      <View style={style.imageCardContainer}>
        <Image 
          source={{ uri: props.doctor.profilPic }}
          style={style.imageCard}
        />
      </View>
      <View style={style.contentCard}>
        <View style={style.titleCard}>
          <Text style={style.titleTextCard}>Dr. {props.doctor.fullName}</Text>
        </View>
        <View style={style.descriptionCard}>
          <Text>Spesialisasi Dokter: {props.doctor.specialist}</Text>
        </View>
        <Text></Text>
        <Text>Jadwal Praktek: {props.doctor.scheduleStart} - {props.doctor.scheduleEnd}</Text>
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