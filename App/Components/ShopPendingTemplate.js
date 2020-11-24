// Components/FilmItem.js

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default class ShopPendingTemplate extends React.Component {
  render() {
    console.log(this.props);
    const MaPropsShopPending = this.props.MaPropsShopPending;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: "#4169e1",
            height: 30,
          }}
        >
          <Text style={{ marginLeft: 15, color: "white" }}>
            {" "}
            id: {MaPropsShopPending.id}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {" "}
            {MaPropsShopPending.status}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {" "}
            Value: {MaPropsShopPending.percent} %
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {" "}
            User: {MaPropsShopPending.beneficiary}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {" "}
            {MaPropsShopPending.validity}
          </Text>
        </View>
      </View>
    );
  }
}
