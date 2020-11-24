import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

export default class Login extends React.Component {
  _Register = (navigation) => {
    this.props.navigation.navigate("Regist");
    console.log("testons");
  };

  _PostShop = (navigation) => {
    console.log("test");
    this.props.navigation.navigate("PostShop");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          //backgroundColor:'#f8f8ff'
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Image
            source={require("../assets/icon_v1_proxi.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 400 / 2,
              marginLeft: "10%",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginLeft: "5%",
              marginTop: 5,
            }}
          ></View>
        </View>

        <View>
          <Text
            style={{
              marginLeft: "10%",
              fontSize: 23,
              fontWeight: "bold",
              color: "#4169e1",
              textAlign: "center",
            }}
          >
            Welcome to ProxyPrizes
          </Text>

          <View style={{ alignItems: "center" }}>
            <Text>Login to your account</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            backgroundColor: "#dcdcdc",
            marginHorizontal: 15,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../src/Images/email-2.png")}
            style={{ width: 20, height: 20, marginTop: 10, marginLeft: 5 }}
          />

          <TextInput
            style={{ marginLeft: 10, fontSize: 15 }}
            placeholder="Enter votre Mail"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            backgroundColor: "#dcdcdc",
            marginHorizontal: 15,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../src/Images/lock.png")}
            style={{ width: 20, height: 20, marginTop: 10, marginLeft: 5 }}
          />

          <TextInput
            style={{ marginLeft: 10, fontSize: 15 }}
            secureTextEntry
            placeholder="Enter you PassWord"
          />
        </View>

        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            onPress={this._PostShop}
            style={{
              marginLeft: "10%",
              color: "#4169e1",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>

          <Text
            onPress={this._Register}
            style={{
              marginLeft: "10%",
              color: "#4169e1",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </View>
      </View>
    );
  }
}

/*style={{
  flexDirection:'row',
  marginTop:10}}>*/

/*<Image
 source={require('/Users/mfoulouyvesmarcel/Desktop/ProApp/ProApp/src/Images/lock.png')}
 style={{width:30, height:30}}/>
    <TextInput
    placeholder='Entrer votre Mail'
    style={{
      backgroundColor:'lime',
      margin:15,
      borderRadius:25}}/>*/
