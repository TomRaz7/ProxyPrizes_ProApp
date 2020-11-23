// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import MesData from './ShopPendingData'
import ShopPendingTemplate from './ShopPendingTemplate'

class ShopPending extends React.Component {
  render() {
    return (
      <View>
        <FlatList
        style={{marginTop:5}}
        data={MesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <ShopPendingTemplate MaPropsShopPending={item}/>}
        />
      </View>
    )
  }
}


export default ShopPending
