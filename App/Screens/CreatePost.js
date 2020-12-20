import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
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
import DropDownPicker from "react-native-dropdown-picker";

import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

import EndpointConfig from "../server/EndpointConfig";

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled == false) {
    console.log(pickerResult);
    return pickerResult;
  } else {
    return false;
  }
};

const categoryData = [
  {
    label: "Toy",
    value: "toy",
  },
  {
    label: "Jewelry",
    value: "jewelry",
  },
  {
    label: "Clothing",
    value: "clothing",
  },
  {
    label: "Kitchen",
    value: "kitchen",
  },
  {
    label: "Sport",
    value: "sport",
  },
  {
    label: "Food",
    value: "food",
  },
];

function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

let todayDate = new Date().toISOString().slice(0, 19).replace("T", " ");

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
      price: "",
      categorytag: "undefined",
      publishedAt: todayDate,
      shop: 1,
      owner: 1,
      customer: null,
      imageuri: "",
      imagename: "",
      imagetype: "",
      imagestate: false,
    };
  }

  addPost(array) {
    fetch(EndpointConfig.addPost, {
      method: "POST",
      body: JSON.stringify(array),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Results do addpost: ");
        console.log(responseJson);
        //this.props.navigation.navigate("PostScrollList");
      });
  }

  createPoste() {
    if (this.state.imagestate == true) this.uploadImage();
    else this.addPost(this.state);
    console.log("reussi");
    Alert.alert("cool");
  }

  uploadImage() {
    fetch(EndpointConfig.getS3)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Results uploading image:");
        console.log(responseJson);

        const file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: this.state.imageuri,
          name: this.state.imagename + ".jpg",
          type: this.state.imagetype + "/jpg",
        };

        const options = {
          keyPrefix: "posts/",
          bucket: "proxyprizes",
          region: "eu-west-3",
          accessKey: responseJson.accessKey,
          secretKey: responseJson.secretKey,
          successActionStatus: 201,
        };

        RNS3.put(file, options).then((response) => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          console.log(response.body);
          console.log("File uploaded to the S3.");
          this.setState({ picture: response.body.postResponse.location });
          this.addPost(this.state);
        });
      });
  }

  handleImage = () => {
    (async () => {
      let _result = await openImagePickerAsync();

      if (_result.cancelled == false) {
        this.setState({ imagename: getRandomString(6) });
        this.setState({ imageuri: _result.uri });
        this.setState({ imagetype: _result.type });
        this.setState({ imagestate: true });
      }
    })();
  };

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
            Welcome to the Form creation of your Post
          </Text>
        </View>

        <View
          style={{
            flex: 7,
            backgroundColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 30 }}>
            <Image
              source={require("../assets/upload-image.jpg")}
              style={{
                height: 90,
                width: 90,
                borderRadius: 200,
                backgroundColor: "grey",
              }}
            />

            <TouchableOpacity style={{ alignSelf: "center", marginLeft: 10 }}>
              <Button
                onPress={() => this.handleImage()}
                title={"Upload picture"}
                color="#4A86E8"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 40, marginTop: 20 }}>
            <TextInput
              style={{ marginTop: 10 }}
              numberOfLines={2}
              placeholder="Product title"
              underlineColorAndroid="#4169e1"
            />

            <TextInput
              style={{ marginTop: 10 }}
              numberOfLines={3}
              placeholder="Description"
              underlineColorAndroid="#4169e1"
            />

            <DropDownPicker
              items={categoryData}
              containerStyle={{ height: 40 }}
              placeholder={"Please select a category"}
              style={{ backgroundColor: "#fafafa", marginTop: 10 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
            />

            <TextInput
              style={{ marginTop: 10 }}
              numberOfLines={2}
              placeholder="Price"
              underlineColorAndroid="#4169e1"
            />

            <TouchableOpacity
              style={{ marginHorizontal: 80, borderRadius: 10, height: 40 }}
            >
              <Button
                onPress={() => this.createPoste()}
                color="#4A86E8"
                title="Create Your Post"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default CreatePost;
