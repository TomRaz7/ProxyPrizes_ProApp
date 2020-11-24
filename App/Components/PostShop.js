import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import PostShopTemplate from "./PostShopTemplate";
import MesData from "./Data";

import EndpointConfig from "../server/EndpointConfig";

//TODO
// Link shop and owner ID based on login (current state is using 1)
// Implement fusioned arrays to merge post data with shop information (shop id, photo, etc)

export default class PostShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      dataLoaded: false,
      data: MesData,
      shop: 1,
      owner: 1,
    };
  }

  // function to fetch all posts related to this shop
  componentDidMount() {
    fetch(EndpointConfig.retrieveShopPosts, {
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
          this.state.posts.push(responseJson[i]);
        }
        this.setState({
          dataLoaded: true,
        });
      });
  }

  render() {
    if (this.state.dataLoaded === false) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            style={{ marginTop: 5 }}
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PostShopTemplate prop={item} />}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
