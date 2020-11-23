// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default class DiscountUseTemplate extends React.Component {
  render() {
    console.log(this.props)
    //const MaPropsShopPending = this.props.MaPropsShopPending
    return (
      <View>
        <View
        style={{
          flexDirection:'row',
           marginTop:15,
           borderRadius:10,
           elevation: 1,
           backgroundColor: '#4169e1',
           height:30}}>
            <Text style={{marginLeft:15, color:'white'}}> Shop</Text>
              <Text style={{marginLeft:15, color:'white'}}> Status</Text>
                <Text style={{marginLeft:15, color:'white'}}> {MaPropsShopPending.percent} %</Text>
                  <Text style={{marginLeft:15, color:'white'}}> Beneficiary</Text>
                    <Text style={{marginLeft:15, color:'white'}}> Validity</Text>
        </View>
      </View>
    )
  }
}
