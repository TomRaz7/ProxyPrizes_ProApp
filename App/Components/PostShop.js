import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import PostShopTemplate from './PostShopTemplate'
import MesData from './Data'

export default class PostShop extends React.Component {
  render(){
    return (
     <View>
        <FlatList
        style={{marginTop:5}}
        data={MesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <PostShopTemplate prop={item}/>}
        />
     </View>
    );
  }
}
