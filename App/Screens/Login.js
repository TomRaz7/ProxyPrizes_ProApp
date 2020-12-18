import React from 'react';
import {Text,View,Image, TextInput, Button, TouchableOpacity} from 'react-native';

 const Login =({navigation}) => {
        return(
          <View
          style={{flex:1, backgroundColor:'#4A86E8',}}>
              <View style={{flexDirection:'row',marginTop:10, justifyContent:'center',}}>
                  <Image
                  source={require('/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/assets/icon_v1_proxi.png')}
                  style={{width:100, height:100,}}/>
                  <Text
                  style={{marginTop:35, fontSize:40, fontWeight:'bold', color:'white'}}>ProxyPrizes</Text>
              </View>

          <View style={{flex:1, backgroundColor:'#4A86E8',alignItems:'center'}}>
              <Text
               style={{fontSize:14, color:'white'}}>Welcome to the Login Page! Rellena este formulario para entrar</Text>
          </View>

          <View
           style={{flex:4, backgroundColor:'white',borderTopLeftRadius:50, borderTopRightRadius:50,}}>
            <View style={{marginTop:40, marginLeft:30}}>
              <Text style={{fontSize:17}}>Email</Text>
            </View>

            <View style={{height: 40, marginTop:10, marginHorizontal:20}}>

                 <View style={{marginLeft:20}}>
                 
                 <TextInput
                 style={{ borderRadius:10, elevation:1, height:40, paddingLeft:10, borderColor:'lime' }}
                 placeholder="Enter Your Name"/>
                 </View>
            </View>




            <View style={{marginTop:15, marginLeft:30 }}>
              <Text style={{fontSize:17}}>Password</Text>
            </View>

            <View style={{height: 40, marginTop:10, marginHorizontal:20}}>

                 <View style={{marginLeft:20}}>
                 <TextInput
                  style={{ borderRadius:10, elevation:1, height:40, paddingLeft:10, borderColor:'lime' }}
                  secureTextEntry
                  placeholder="Enter Your Password"
                  //underlineColorAndroid="#4A86E8"
                 />
                 </View>

            </View>



            <View style={{marginTop:20, marginHorizontal:30}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileShop')}
                style={{backgroundColor:'#4A86E8', alignItems:'center', marginHorizontal:20, height:30, borderRadius:10}}>
                <Text style={{fontSize:17, color:'white', fontWeight:'bold'}}>Sign In</Text>
              </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=> navigation.navigate("CreateAccount")}
                  style={{marginTop:20, backgroundColor:'#4A86E8', alignItems:'center', marginHorizontal:20, height:30, borderRadius:10}}>
                  <Text style={{fontSize:17, color:'white', fontWeight:'bold'}}>Sign Up</Text>
                </TouchableOpacity>

            </View>


            </View>


          </View>
        )
    }
export default Login
