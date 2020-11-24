import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import EndpointConfig from "../server/EndpointConfig";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      name: "",
      forname: "",
      picture: "",
      phone: "",
      siret: "",
      shopname: "",
      shopaddress: "",
      shopcity: "",
      shopwebsite: "",
      shoplatitude: "",
      shoplongitude: "",
    };
  }

  _PostShop = (navigation) => {
    console.log("test");
    this.props.navigation.navigate("PostShop");
  };

  createAccount(array) {
    fetch(EndpointConfig.createAccount, {
      method: "POST",
      body: JSON.stringify(array),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Results do createaccount: ");
        console.log(responseJson);
        this._PostShop;
      });
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#4169e1",
              }}
            >
              {" "}
              ProxyPrize
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Fill out this form to Register
          </Text>
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Enter your name"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Enter your surname"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ forname: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            autoCompleteType={"email"}
            placeholder="Enter your email"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            autoCompleteType={"tel"}
            placeholder="Enter your phone"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ phone: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Enter Your Siret"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ siret: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            secureTextEntry
            placeholder="Enter your password"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            secureTextEntry
            placeholder="Confirm your password"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Shop's name"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ shopname: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Shop address"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ shopaddress: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Shop latitude"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ shoplatitude: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Shop longitude"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ shoplongitude: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Shop's city"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ shopcity: text })}
          />
        </View>

        <View style={{ marginHorizontal: 50 }}>
          <TextInput
            placeholder="Shop's website"
            placeholdertextcolor="#4169e1"
            underlineColorAndroid="#4169e1"
            style={{ fontSize: 15 }}
            onChangeText={(text) => this.setState({ shopwebsite: text })}
          />
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#4169e1",
            marginHorizontal: 90,
            height: 40,
            borderRadius: 10,
          }}
          onPress={() => this.createAccount(this.state)}
        >
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
