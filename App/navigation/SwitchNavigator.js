import * as React from "react";
import { Button, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../Screens/HomeScreen";
import SettingScreen from "../Screens/SettingScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import ShopPending from "../Screens/ShopPending";
import DispensingScreen from "../Screens/DispensingScreen";
import Login from "../Screens/Login";
import PostShop from "../Screens/PostShop";
import CreatePost from "../Screens/CreatePost";

const Stack = createStackNavigator();
const Bottom = createMaterialBottomTabNavigator();

function MyBottomNavigator() {
  return (
    <Bottom.Navigator initialRouteName="Login">
      <Bottom.Screen
        name="PostShop"
        component={PostShop}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../assets/shop.png")}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="DiscountUse"
        component={ShopPending}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../assets/basket-shop.png")}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="DispensingScreen"
        component={DispensingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../assets/shopping-cart.png")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: ({ Colors }) => (
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../assets/add-file.png")}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: "black",
        headerStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //headerTransparent: true,
          headerTitleAlign: "center",
          //headerTintColor:"white",
        }}
      />
      <Stack.Screen name="ProfileShop" component={MyBottomNavigator} />
      <Stack.Screen name="CreateAccount" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function SwitchNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
