import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

 class ShopPendingTemplate extends React.Component {
  render() {
    console.log(this.props.id)
    const ShopPendingProps = this.props.MaPropsShopPending
    return (
      <View>
        <View
          style={{flexDirection: "row",marginTop: 15, borderRadius: 10,elevation: 1,backgroundColor: "#4169e1",height: 30,
          }}
        >
          <Text style={{ marginLeft: 15, color: "white" }}>
            id: {ShopPendingProps.id}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {ShopPendingProps.status}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            Value: {ShopPendingProps.percent} %
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            User: {ShopPendingProps.beneficiary}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {ShopPendingProps.validity}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            test:{ShopPendingProps.Beneficiary}
          </Text>
        </View>
      </View>
    );
  }
}

export default ShopPendingTemplate
