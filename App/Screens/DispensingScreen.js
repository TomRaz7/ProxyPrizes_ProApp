
import React from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Button,Image,TouchableOpacity,FlatList}from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ShopPendingTemplate from './ShopPendingTemplate'

const DispensingScreen = ({navigation}) =>{
  return(
    <View>
    <FlatList
    data={MesDatas}
    keyExtractor={(item) => item.id.toString()}
    renderItem={(item)=> <ShopPendingTemplate MaPropsShopPending={item}/>}/>
    </View>
    )
}

export default DispensingScreen
