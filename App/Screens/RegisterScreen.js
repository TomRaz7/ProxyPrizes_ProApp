import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
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

import EndpointConfig from "../server/EndpointConfig";

//const DetailScreen = ({navigation}) => {

class RegisterScreen extends React.Component {
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

  _navigo = () => {
    console.log("je teste");
    this.props.navigation.navigate("Login");
    //onPress={() => this._navigo()}
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
        this._navigo;
      });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#4A86E8" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../assets/icon_v1_proxi.png")}
            style={{ width: 70, height: 70 }}
          />
          <Text
            style={{
              marginTop: 25,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            ProxyPrizes
          </Text>
        </View>

        <View style={{ backgroundColor: "#4A86E8", alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "white", marginBottom: 10 }}>
            Welcome to the Login Page! Rellena este formulario para entrar
          </Text>
        </View>

        <View
          style={{
            flex: 5,
            backgroundColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 40 }}
          >
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 200,
                  backgroundColor: "grey",
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 30,
                  marginLeft: 20,
                }}
              >
                <TouchableOpacity style={{ marginTop: 10 }}>
                  <Button title="Enter your Button" />
                </TouchableOpacity>

                <Image
                  source={require("../assets/camera.png")}
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 10,
                    marginLeft: "40%",
                  }}
                />
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <TextInput
                placeholder="Enter your name"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                onChangeText={(text) => this.setState({ name: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                autoCompleteType={"email"}
                placeholder="Enter your Email"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                onChangeText={(text) => this.setState({ email: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                autoCompleteType={"tel"}
                placeholder="Enter your phone"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ phone: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                secureTextEntry
                placeholder="Enter your password"
                underlineColorAndroid="#4169e1"
                style={{ fontSize: 15 }}
              />

              <TextInput
                secureTextEntry
                placeholder="Confirm your password"
                underlineColorAndroid="#4169e1"
                onChangeText={(text) => this.setState({ password: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                placeholder="Shop's name"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                onChangeText={(text) => this.setState({ shopname: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                placeholder="Shop address"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                onChangeText={(text) => this.setState({ shopaddress: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                placeholder="Shop's city"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                onChangeText={(text) => this.setState({ shopcity: text })}
                style={{ fontSize: 15 }}
              />

              <TextInput
                placeholder="Shop's website"
                placeholdertextcolor="#4169e1"
                underlineColorAndroid="#4169e1"
                style={{ fontSize: 15 }}
                onChangeText={(text) => this.setState({ shopwebsite: text })}
              />
            </View>
            <TouchableOpacity style={{ marginHorizontal: 40 }}>
              <Button
                onPress={() => this.createAccount(this.state)}
                title="Create Post"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default RegisterScreen;
