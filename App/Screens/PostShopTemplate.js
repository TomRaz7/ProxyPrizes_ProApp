import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import EndpointConfig from "../server/EndpointConfig";

import TimeAgo from "react-native-timeago";

let todayDate = new Date().toISOString().slice(0, 19).replace("T", " ");

class PostShopTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      discountRewardValue: 0,
      userId: 1, //should implement a Redux storage in the pro App as well for the final presentation
      expoToken: null,
      prop: this.props.prop,
      isDeleteVisible: false,
    };
  }
  componentDidMount() {
    console.log("les props du component");
    console.log(this.props);
    this.retrieveExpoPushTokenFromDB();

    if (this.state.userId === this.props.prop.owner) {
      console.log("Same user");
      this.setState({
        isDeleteVisible: true,
      });
    }
  }

  retrieveExpoPushTokenFromDB() {
    console.log(this.state.prop);
    var destinary = null;
    if (this.state.prop.customer !== null) {
      destinary = this.state.prop.customer;
    } else {
      destinary = this.state.userId;
    }
    fetch(EndpointConfig.retrieveExpoToken, {
      method: "POST",
      body: JSON.stringify({
        userId: destinary,
        toWho: "single",
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].expoToken);
        this.setState({
          expoToken: responseJson[0].expoToken,
        });
      });
  }

  sendDiscountNotification() {
    console.log("notification côté client");
    fetch(EndpointConfig.sendNotification, {
      method: "POST",
      body: JSON.stringify({
        expoToken: this.state.expoToken,
        notificationTitle: "You've just received anew discount",
        notificationBody: `You received a ${this.state.discountRewardValue} % discount`,
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("La réponse json");
        console.log(responseJson);
      });

    //this.setState({ modalVisible: false });
  }

  deletePost(id) {
    console.log("OK Pressed");

    var postData = { postId: id };

    fetch(EndpointConfig.deletePost, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Post deleted.");
        this.props.navigation.navigate("PostScrollList");
      });
  }

  persistDiscountInDb() {
    console.log("persist");
    if (this.state.prop.customer !== null) {
      fetch(EndpointConfig.persistNewDiscount, {
        method: "POST",
        body: JSON.stringify({
          shop: this.state.prop.shop,
          beneficiary: this.state.prop.customer,
          discountValue: this.state.discountRewardValue,
          validity: todayDate,
        }),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        });
    } else {
      Alert.alert(
        "This post belongs to you !",
        "This post belongs to you you can not reward your own posts",
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
    this.setState({ modalVisible: false });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const MesProps = this.props.prop;
    return (
      <View>
        <TouchableOpacity
          style={{
            marginTop: 8,
            marginHorizontal: 5,
            borderRadius: 10,
            elevation: 1,
            backgroundColor: "white",
            height: 400,
          }}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/basket-shop.png")}
              style={{ width: 70, height: 70, borderRadius: 200 }}
            />

            <View
              style={{ flexDirection: "column", marginTop: 10, marginLeft: 10 }}
            >
              <Text
                style={{ color: "#4169e1", fontSize: 20, fontWeight: "bold" }}
              >
                {" "}
                {MesProps.title}{" "}
              </Text>
              <Text style={{ width: "55%" }}>{MesProps.description}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ marginTop: 20, fontSize: 30 }}>
                {MesProps.price}$
              </Text>
            </View>
          </View>

          <View>
            <Image
              source={{ uri: MesProps.picture }}
              style={{ justifyContent: "center", height: "80%", width: "100%" }}
            />

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 5,
                  marginLeft: 30,
                }}
              >
                {MesProps.categoryTag}
              </Text>
              <Text style={{ marginTop: 15, fontSize: 17, fontWeight: "bold" }}>
                {MesProps.likeCounter}
              </Text>
              <TimeAgo time={MesProps.publishedAt} style={styles.time} />
            </View>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Reward this post </Text>
              <TextInput
                style={styles.textInput}
                placeholder={"Reward in %"}
                onChangeText={(text) =>
                  this.setState({ discountRewardValue: text })
                }
                keyBoardType="numeric"
                underlineColorAndroid="#4A86E8"
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.sendDiscountNotification();
                  this.persistDiscountInDb();
                }}
              >
                <Text style={styles.textStyle}>Proceed discount</Text>
              </TouchableHighlight>
              {this.state.isDeleteVisible && (
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#FF0000" }}
                  onPress={() => {
                    this.deletePost(MesProps.id);
                  }}
                >
                  <Text style={styles.textStyle}>Delete post</Text>
                </TouchableHighlight>
              )}
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#EA4C46" }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  time: {
    fontSize: 13,
    color: "#808080",
    marginLeft: 5,
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PostShopTemplate;
