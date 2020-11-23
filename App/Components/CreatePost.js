import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

export default class CreatePost extends React.Component {

  render(){
    return (
     <View>
            <View style={{alignItems:'center', marginTop:5, flexDirection:'row', justifyContent:'center'}}>
            <Image
              style={{height:150, width:150, borderRadius:200, backgroundColor:'grey'}}/>
              <Image
              source={require('/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/src/Images/camera.png')}
                style={{height:30, width:30,marginLeft:-50, marginTop:80}}
              />
            </View>


           <View
             style={{marginHorizontal:30}}>
             <TextInput
             placeholder='title'
             underlineColorAndroid="#4169e1"/>

             <TextInput
             placeholder='Description'
             underlineColorAndroid="#4169e1"/>

             <TextInput
             placeholder='Category Type'
             underlineColorAndroid="#4169e1"/>

             <TextInput
             placeholder='Price'
             underlineColorAndroid="#4169e1"/>

             <TextInput
             placeholder='Published Day'
             underlineColorAndroid="#4169e1"/>
           </View>


            <TouchableOpacity
            style={{
              alignItems:'center',
              backgroundColor:'#4169e1',
              marginHorizontal:80,
              marginTop:10,
              borderRadius:10,
              height:70,
              }}>
                <Text
                style={{fontSize:18, marginTop:15, color:'white'}}> Create Your Post</Text>
            </TouchableOpacity>

     </View>
    );
  }
}
