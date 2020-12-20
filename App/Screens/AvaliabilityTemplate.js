import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

class AvaliabilityTemplate extends React.Component {
  render() {
    const AvaliabilityProps = this.props.MaPropsAvaliability.item;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: "#07a644",
            height: 30,
          }}
        >
          <Text style={{ marginLeft: 15, color: "white" }}>
            id: {AvaliabilityProps.id}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            {AvaliabilityProps.status}
          </Text>
          <Text style={{ marginLeft: 15, color: "white" }}>
            Description: {AvaliabilityProps.description}
          </Text>
        </View>
      </View>
    );
  }
}

export default AvaliabilityTemplate;
