import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
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
import ShopPendingTemplate from "./ShopPendingTemplate";
import ShopUsedTemplate from "./ShopUsedTemplate";
import AvaliabilityTemplate from "./AvaliabilityTemplate";

import EndpointConfig from "../server/EndpointConfig";
import Modal from "react-native-modal";

export default class DispensingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discounts: [],
      requests: [],
      dataLoaded: false,
      isModalVisible: false,
      shop: 1,
      selectedItem: "",
      selectedCreator: "",
    };
  }

  componentDidMount() {
    fetch(EndpointConfig.retrieveUsedDiscounts, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          this.state.discounts.push(responseJson[i]);
          console.log(responseJson[i]);
        }
        this.setState({
          dataLoaded: true,
        });
      });

    fetch(EndpointConfig.getAvaliabilityRequest, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          this.state.requests.push(responseJson[i]);
          console.log(responseJson[i]);
        }
        this.setState({
          dataLoaded: true,
        });
      });
  }

  _handleModal(item) {
    this.setState({ isModalVisible: true });
    this.setState({ selectedItem: item.id });
    this.setState({ selectedCreator: item.creator });
  }

  answerAvaliability(action) {
    var answerData = {
      id: this.state.selectedItem,
      avaliable: action,
    };

    fetch(EndpointConfig.answerAvaliabilityRequest, {
      method: "POST",
      body: JSON.stringify(answerData),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      });
  }

  render() {
    if (this.state.dataLoaded === false) {
      return (
        <View styles={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.textSeparator}>Your used discounts:</Text>
          <FlatList
            data={this.state.discounts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => <ShopUsedTemplate MaPropsShopUsed={item} />}
          />
          <Text style={styles.textSeparator}>Your avaliability requests:</Text>
          <FlatList
            data={this.state.requests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => (
              <TouchableOpacity onPress={() => this._handleModal(item.item)}>
                <AvaliabilityTemplate MaPropsAvaliability={item} />
              </TouchableOpacity>
            )}
          />
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
          >
            <View style={styles.viewModal}>
              <Text style={styles.textSeparator}>
                {" "}
                Select answer for request: {this.state.selectedItem}
              </Text>
              <View style={styles.viewButtons}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Button
                    title="Avaliable"
                    onPress={() => this.answerAvaliability("avaliable")}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Button
                    title="Unavaliable"
                    onPress={() => this.answerAvaliability("not avaliable")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textSeparator: {
    fontSize: 18,
    color: "#808080",
    marginLeft: 5,
    marginTop: 10,
  },
  buttonStyle: {
    marginTop: 5,
    marginBottom: 5,
  },
  viewButtons: {
    flex: 1,
    marginHorizontal: 80,
    borderRadius: 10,
    height: 40,
    color: "blue",
  },
  viewModal: {
    //flex: 1,
    alignSelf: "center",
    //justifyContent: "center",
    //flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
