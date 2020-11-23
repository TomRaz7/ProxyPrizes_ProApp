import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';


export default class Register extends React.Component {
  render(){
    return (
     <View>
        <View style={{flexDirection:'column', alignItems:'center'}}>
            <Image
             source={require('/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/src/Images/Asong.jpg')}
             style={{width:150, height:150, borderRadius:200}}/>

             <View
               style={{
                 flexDirection:'column',
                 marginTop:10,
                 marginLeft:15}}>
                <Text
                style={{
                  fontSize:20,
                  fontWeight:'bold',
                  color:'#4169e1'}}> ProxyPrize</Text>

             </View>
        </View>

        <View>
          <Text
          style={{
            textAlign:'center',
            fontWeight:'bold',
            fontSize:15
            }}>Fill out this form to Register</Text>

        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              placeholder='Enter your Name'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              placeholder='Enter Your First Name'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              autoCompleteType={'email'}
              placeholder='Enter Your Email'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              autoCompleteType={'tel'}
              placeholder='Enter Your Phone'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              placeholder='Enter Your Siret'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              secureTextEntry
              placeholder='Enter Your PassWord'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>

        <View
          style={{marginHorizontal:50}}>
            <TextInput
              secureTextEntry
              placeholder='Confirm Your PassWord'
              placeholdertextcolor='#4169e1'
              underlineColorAndroid="#4169e1"
              style={{fontSize:15}}/>
        </View>


        <TouchableOpacity
        style={{
          alignItems:'center',
          backgroundColor:'#4169e1',
          marginHorizontal:90,
          height:40,
          borderRadius:10}}>
          <Text
          style={{
            marginTop:5,
            fontSize:20,
            fontWeight:'bold'}}>Register</Text>
        </TouchableOpacity>
     </View>
    );
  }
}
