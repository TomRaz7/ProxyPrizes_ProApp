import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

//Implemented
// Create post finished (successfully inserting into database and uploading pictures)

//TODO
// Link owner id and shop id from login (im using mock ids)

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

export default class CreatePost extends React.Component {
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

  createPost() {
    if (this.state.imagestate == true) this.uploadImage();
    else this.addPost(this.state);
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
      <View>
        <View
          style={{
            alignItems: "center",
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: 150,
              width: 150,
              borderRadius: 200,
              backgroundColor: "grey",
            }}
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Button
              title={"Upload picture"}
              color="#4A86E8"
              onPress={() => this.handleImage()}
            />
          </TouchableOpacity>
          <Image
            source={require("../src/Images/camera.png")}
            style={{ height: 30, width: 30, marginLeft: -50, marginTop: 80 }}
          />
        </View>

        <View style={{ marginHorizontal: 30 }}>
          <TextInput
            placeholder="title"
            underlineColorAndroid="#4169e1"
            onChangeText={(text) => this.setState({ title: text })}
          />

          <TextInput
            placeholder="Description"
            underlineColorAndroid="#4169e1"
            onChangeText={(text) => this.setState({ description: text })}
          />

          <DropDownPicker
            items={categoryData}
            containerStyle={{ height: 40 }}
            placeholder={"Please select a category"}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              this.setState({
                categorytag: item.value,
              })
            }
          />

          <TextInput
            placeholder="Price"
            underlineColorAndroid="#4169e1"
            onChangeText={(text) => this.setState({ price: text })}
          />
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#4169e1",
            marginHorizontal: 80,
            marginTop: 10,
            borderRadius: 10,
            height: 70,
          }}
          onPress={() => this.createPost()}
        >
          <Text style={{ fontSize: 18, marginTop: 15, color: "white" }}>
            {" "}
            Create Your Post
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  uploadButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 2,
  },
});
