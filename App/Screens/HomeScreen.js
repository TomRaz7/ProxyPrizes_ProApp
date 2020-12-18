import React from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Button,Image,TouchableOpacity}from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

 const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title="Go to Setting"
      onPress={() => navigation.navigate('Settings')}
    />

    <Button
      title="Details"
      onPress={() => navigation.navigate('DetailScreen')}
    />
    </View>
  );
}

export default HomeScreen
