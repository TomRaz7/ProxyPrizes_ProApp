import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import ConfigStore from "../storeRedux/ConfigStore";

import EndpointConfig from "../server/EndpointConfig";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null, //token is set to null for the first connection, then it will be stored within the redux persistor
      userMail: "",
      userPassword: "",
      passwordForgotten: false,
      createAccount: 0,
    };
  }

  _connect(mail, password) {
    if (
      1 === 1 ||
      (this.state.userMail !== "" && this.state.userPassword !== "")
    ) {
      fetch(EndpointConfig.fetchLogin, {
        method: "POST",
        body: JSON.stringify({
          table: "owner",
          email: this.state.userMail,
          password: this.state.userPassword,
        }),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.code === 200 && responseJson.token !== undefined) {
            let userCredentials = {
              id: responseJson.user.id,
              mail: this.state.userMail,
              password: this.state.userPassword,
              token: responseJson.token,
            };
            const action = { type: "TOGGLE_CONNECT", value: userCredentials };
            this.props.dispatch(action);
          } else if (responseJson.code === 404) {
            Alert.alert(
              "Error",
              "Please check your credencials",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ],
              { cancelable: false }
            );
          }
        });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#4A86E8" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/icon_v1_proxi.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              marginTop: 35,
              fontSize: 40,
              fontWeight: "bold",
              color: "white",
            }}
          >
            ProxyPrizes
          </Text>
        </View>

        <View
          style={{ flex: 1, backgroundColor: "#4A86E8", alignItems: "center" }}
        >
          <Text style={{ fontSize: 14, color: "white" }}>
            Welcome to the Login Page! Rellena este formulario para entrar
          </Text>
        </View>

        <View
          style={{
            flex: 4,
            backgroundColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <View style={{ marginTop: 40, marginLeft: 30 }}>
            <Text style={{ fontSize: 17 }}>Email</Text>
          </View>

          <View style={{ height: 40, marginTop: 10, marginHorizontal: 20 }}>
            <View style={{ marginLeft: 20 }}>
              <TextInput
                style={{
                  borderRadius: 10,
                  elevation: 1,
                  height: 40,
                  paddingLeft: 10,
                  borderColor: "lime",
                }}
                placeholder="Enter your name"
                onChangeText={(text) => this.setState({ userMail: text })}
              />
            </View>
          </View>

          <View style={{ marginTop: 15, marginLeft: 30 }}>
            <Text style={{ fontSize: 17 }}>Password</Text>
          </View>

          <View style={{ height: 40, marginTop: 10, marginHorizontal: 20 }}>
            <View style={{ marginLeft: 20 }}>
              <TextInput
                style={{
                  borderRadius: 10,
                  elevation: 1,
                  height: 40,
                  paddingLeft: 10,
                  borderColor: "lime",
                }}
                secureTextEntry
                placeholder="Enter you password"
                onChangeText={(text) => this.setState({ userPassword: text })}
                //underlineColorAndroid="#4A86E8"
              />
            </View>
          </View>

          <View style={{ marginTop: 20, marginHorizontal: 30 }}>
            <TouchableOpacity
              //onPress={() => navigation.navigate("ProfileShop")}
              onPress={() => this.props.navigation.navigate("ProfileShop")}
              //onPress={() =>
              //  this._connect(this.state.userMail, this.state.userPassword)
              //}
              style={{
                backgroundColor: "#4A86E8",
                alignItems: "center",
                marginHorizontal: 20,
                height: 30,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
              style={{
                marginTop: 20,
                backgroundColor: "#4A86E8",
                alignItems: "center",
                marginHorizontal: 20,
                height: 30,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
