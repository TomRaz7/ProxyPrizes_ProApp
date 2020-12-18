import React from "react";
import {StyleSheet,Text,View,TextInput,Image,TouchableOpacity,ImageBackground,} from "react-native";


class PostShopTemplate extends React.Component  {

  render(){
    console.log(this.props)
  const MesProps = this.props.prop
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
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("/Users/mfoulouyvesmarcel/Desktop/ProAppClone/ProxyPrizes_ProApp/App/assets/basket-shop.png")}
              style={{ width: 70, height: 70, borderRadius: 200 }}
            />

            <View
              style={{ flexDirection: "column", marginTop: 10, marginLeft: 10 }}
            >
              <Text style={{ color: "#4169e1", fontSize: 20, fontWeight: "bold" }}> {MesProps.title} </Text>
              <Text style={{ width: "55%" }}>{MesProps.description}</Text>
            </View>

            <View
            style={{alignItems:'flex-end'}}>
              <Text style={{ marginTop: 20, fontSize: 30 }}>
                {MesProps.price}$
              </Text>
            </View>
          </View>

          <View>
            <Image
              source={{uri: MesProps.picture}}
              style={{ justifyContent: "center", height: "80%", width: "100%" }}
            />

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{  marginTop: 10,fontSize: 20,fontWeight: "bold",margin: 5,marginLeft: 30,}}
              >
                {MesProps.categoryTag}
              </Text>
              <Text style={{ marginTop: 15, fontSize: 17, fontWeight: "bold" }}>
                 {MesProps.likeCounter}
              </Text>
              <Text style={{ marginLeft: "15%", marginTop: 10 }}>
              {MesProps.publishedAt}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
}
}

export default PostShopTemplate