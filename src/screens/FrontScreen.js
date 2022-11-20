import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, SafeAreaView, View } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'

export default function App({ navigation }) {
  const reset = () => {
    const removeAsyncStorage = AsyncStorage.removeItem('@storage_key')
    return removeAsyncStorage
  }

  return (
    <SafeAreaView style={ styles.container }>
      <Text style={ styles.text }>Demo App</Text>
      <View style={{ marginBottom: 15 }}>
        <Button 
          title='Start'
          color='blue'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <Button 
          title='Restart'
          color='red'
          onPress={() => reset()}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
