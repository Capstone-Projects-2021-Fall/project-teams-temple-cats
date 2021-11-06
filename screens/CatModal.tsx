import React from 'react';
import { StyleSheet, Image} from 'react-native';
import { Text, View } from '../components/Themed';
import { Cat, RootStackParamList, RootTabScreenProps } from '../types';

export default function ModalScreen({ route }, { navigation }: RootTabScreenProps<'Home'>) {
  const cat: Cat = route.params.cat;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cat.votes} updoots</Text>
      <Image
        style={{ width: 200, height: 200, top: -150 }}
        source={{
          uri: cat.media
        }}
      />

      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />      

      <View style={styles.content}>
        <Text style={styles.contentList}>
          {'Date Sighted: ' + cat.date + ' ' + cat.time + '\n'}
          {cat.name ? 'Collar Name: ' + cat.name + '\n' : ''}
          {cat.color ? 'Color: ' + cat.color + '\n' : ''}
          {cat.eyeColor ? 'Eye Color: ' + cat.eyeColor + '\n' : ''}
          {cat.kitten != null ? 'Kitten: ' + cat.kitten + '\n' : ''}
          {cat.healthy != null ? 'Healthy: ' + cat.healthy + '\n' : ''}
          {cat.friendly != null ? 'Friendly: ' + cat.friendly + '\n' : ''}
          {cat.comments ? 'Additional Comments: ' + cat.comments + '\n' : ''}
        </Text>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 100
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: '80%',
    top: -140
  },
  content: {
    fontSize: 20,
    top: -160,
    left: -150
  },
  contentList: {
    left: 100, 
    top: 25 
  },

});