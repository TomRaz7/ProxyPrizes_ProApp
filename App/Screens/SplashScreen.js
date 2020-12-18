import React from 'react';
import { StyleSheet, Text, View,TextInput, FlatList, Image, TouchableOpacity } from 'react-native';


const SplashScreen: () => React$Node = () => {

  return (
    <View
    style={{flex:1, backgroundColor:'#4A86E8'}}>
    <View style={{flex:2, alignItems:'center', marginTop:30, }}>
        <Image
        style={{borderRadius:400/2, height:'55%', width:'50%', }}
        source={require('/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/assets/icon_v1_proxi.png')}/>

        <Text
        style={{fontSize:35, alignItems:'center', justifyContent:'center', fontWeight:'bold', color:'white'}}> ProxyPrizes </Text>
    </View>

    <View style={{flex:1.5, backgroundColor:'white',borderTopLeftRadius:50,borderTopRightRadius:50}}>
       <Text
       style={{marginTop:20, fontSize:30, fontWeight:'bold',marginLeft:'10%'}}>Stay Connected with your Shop!</Text>
       <Text
       style={{color:'grey', marginLeft:'10%'}}>Click here to Start</Text>

          <TouchableOpacity
          style={{alignItems:'flex-end', marginTop:20,}}>
              <View style={{backgroundColor:'#4A86E8', marginRight:'10%', width:'40%', height:'35%', borderRadius:20}}>
                <Text style={{ marginLeft:'33%', color:'white', fontSize:15, fontWeight:'bold' }}>Get Start</Text>
              </View>
          </TouchableOpacity>

    </View>
    </View>
  );
}
export default SplashScreen;
