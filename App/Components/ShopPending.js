// Components/FilmItem.js

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MesData from "./ShopPendingData";
import ShopPendingTemplate from "./ShopPendingTemplate";

import EndpointConfig from "../server/EndpointConfig";

//TODO
// Link shop id with real id got from login.

class ShopPending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discounts: [],
      dataLoaded: false,
      shop: 1,
    };
  }
  // function to get pending discounts from the db
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
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      );
    } else {
      return (
        <View>
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ShopPending;
