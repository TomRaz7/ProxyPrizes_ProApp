import React from "react";
import {
  SafeAreaView,
  StyleSheet,
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

import ShopPendingTemplate from "./ShopPendingTemplate";
import MesDatas from "../FakeData/ShopPendingData";

import EndpointConfig from "../server/EndpointConfig";

class ShopPending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discounts: [],
      dataLoaded: false,
      shop: 1,
    };
  }

  componentDidMount() {
    fetch(EndpointConfig.retrievePendingDiscounts, {
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
          this.state.discounts.push(responseJson[i]);
        }
        this.setState({
          dataLoaded: true,
        });
      });
  }

  render() {
    if (this.state.dataLoaded === false) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.textSeparator}>Your pending discounts:</Text>
          <FlatList
            style={{ marginTop: 5 }}
            data={this.state.discounts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ShopPendingTemplate MaPropsShopPending={item} />
            )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textSeparator: {
    fontSize: 18,
    color: "#808080",
    marginLeft: 5,
    marginTop: 10,
  },
});

export default ShopPending;
