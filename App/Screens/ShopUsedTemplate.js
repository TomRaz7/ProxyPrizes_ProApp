import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

class ShopUsedTemplate extends React.Component {
  render() {
    const ShopUsedProps = this.props.MaPropsShopUsed.item;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
            elevation: 1,
            backgroundColor: "#4169e1",
            height: 30,
          }}
        >
          <Text style={{ marginLeft: 15, color: "white" }}>
            id: {ShopUsedProps.id}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {ShopUsedProps.status}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            Value: {ShopUsedProps.percent} %
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            User: {ShopUsedProps.beneficiary}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            Exp:{ShopUsedProps.validity}
          </Text>
        </View>
      </View>
    );
  }
}

export default ShopUsedTemplate;
