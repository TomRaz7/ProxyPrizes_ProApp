import * as React from "react";
import { Button, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import Login from "./Components/Login";
import PostShop from "./Components/PostShop";
import ShopPending from "./Components/ShopPending";
import DiscountUse from "./Components/DiscountUse";
import Register from "./Components/Register";
import Data from "./Components/Data";
import CreatePost from "./Components/CreatePost";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const DiscountUses = createStackNavigator();
const ShopPendings = createStackNavigator();
const CreatePosts = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4169e1" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={PostShop}
      options={{
        title: "Post Shop",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("./src/Images/menu.png")}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <HomeStack.Screen name="Login" component={Login} />
    <HomeStack.Screen name="Regist" component={Register} />
  </HomeStack.Navigator>
);

const ShopPendingScreen = ({ navigation }) => (
  <DiscountUses.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4169e1" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <DiscountUses.Screen
      name="Home"
      component={ShopPending}
      options={{
        title: "Pending Discount",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("./src/Images/menu.png")}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <DiscountUses.Screen name="Login" component={Login} />
  </DiscountUses.Navigator>
);

const DiscountUsesScreen = ({ navigation }) => (
  <DiscountUses.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4169e1" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <DiscountUses.Screen
      name="Home"
      component={DiscountUse}
      options={{
        title: "Use Discount",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("./src/Images/menu.png")}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <DiscountUses.Screen name="Login" component={Login} />
  </DiscountUses.Navigator>
);

const CreatePostScreen = ({ navigation }) => (
  <CreatePosts.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4169e1" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <CreatePosts.Screen
      name="Home"
      component={CreatePost}
      options={{
        title: "Create Post",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("./src/Images/menu.png")}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <CreatePosts.Screen name="Login" component={Login} />
  </CreatePosts.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4169e1" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <DetailsStack.Screen
      name="Home"
      component={PostShop}
      options={{ title: "DetailsStack" }}
    />
    <DetailsStack.Screen name="Login" component={Login} />
  </DetailsStack.Navigator>
);

const TabScreen = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4169e1" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}
  >
    <Tab.Screen
      name="Home"
      component={PostShop}
      options={{ title: "DetailsStack" }}
    />
    <Tab.Screen name="Login" component={Login} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="PostShop" component={HomeStackScreen} />
        <Drawer.Screen name="Pending Discount" component={ShopPendingScreen} />
        <Drawer.Screen name="Use Discount " component={DiscountUsesScreen} />
        <Drawer.Screen name="Create Post " component={CreatePostScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
