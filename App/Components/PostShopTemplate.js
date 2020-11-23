import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native';


export default class PostShop extends React.Component {
  render(){
    console.log(this.props)
    const MaProps = this.props.prop
    return (
     <View>
      <TouchableOpacity
      style={{
      marginTop:8,
      marginHorizontal:5,
      borderRadius:10,
      elevation: 1,
      backgroundColor: 'white',
      height:400
        }}>

        <View
        style={{flexDirection:'row'}}>
            <Image
            source={require('/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/src/Images/Asong.jpg')}
            style={{width:70, height:70, borderRadius:200}}/>

              <View
                  style={{flexDirection:'column',marginTop:10,marginLeft:10}}>
                  <Text style={{color:'#4169e1',fontSize:20,fontWeight:'bold'}}>{MaProps.Title}</Text>
                  <Text style={{width: '55%',}}>{MaProps.description}</Text>
              </View>

              <View
              style={{alignContent:'flex-end'}}>
                <Text style={{marginTop:20, fontSize:30, marginLeft:-30}}>{MaProps.price}$</Text>
              </View>
        </View>



          <View>
            <Image
            source={require('/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/src/Images/godas.jpg')}
            style={{justifyContent:'center',height:'80%',width:'100%'}}/>

              <View style={{flexDirection:'row'}}>

              <Text style={{marginTop:10, fontSize:20, fontWeight:'bold', margin:5}}>{MaProps.categoryTag}</Text>
              <Text style={{marginTop:15, fontSize:17, fontWeight:'bold'}}>{MaProps.likeCounter}Likes</Text>
              <Text style={{marginLeft:20,marginTop:15,}}>Sorti le{MaProps.publishedAt}</Text>
              </View>

            </View>


      </TouchableOpacity>
     </View>
    );
  }
}
