import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MesData from "../FakeData/Data";

import PostShopTemplate from "./PostShopTemplate";

import EndpointConfig from "../server/EndpointConfig";
import ConfigStore from "../storeRedux/ConfigStore";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

class PostShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      dataLoaded: false,
      data: MesData,
      shop: 1,
      owner: 1,
      ownerExpoToken: "",
    };
  }

  // function to fetch all posts related to this shop
  async componentDidMount() {
    fetch(EndpointConfig.retrieveShopPosts, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          this.state.posts.push(responseJson[i]);
        }
        this.setState({
          dataLoaded: true,
        });
      });

    await this.getExpoToken();
  }

  getExpoToken = async () => {
    var tokenData = {
      //userId: ConfigStore.getState().toggleAuthentication.userId,
      userId: 1,
      expoToken: "empty",
    };
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    //console.log(token);
    tokenData.expoToken = token.data;
    this.state.ownerExpoToken = token.data;

    // updates the customer table with the expotoken
    fetch(EndpointConfig.addExpoToken, {
      method: "POST",
      body: JSON.stringify(tokenData),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Results of inserting expo token: ");
        console.log(responseJson);
      });
  };

  render() {
    if (this.state.dataLoaded === false) {
      return (
        <View styles={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            style={{ marginTop: 5 }}
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PostShopTemplate prop={item} />}
          />
        </View>
      );
    }
  }
}

export default PostShop;
