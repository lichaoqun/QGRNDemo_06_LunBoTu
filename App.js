/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import ImageData from './ImageData.json';
import Dimensions from 'Dimensions';
var screenWidht = Dimensions.get('window').width;

export default class App extends Component<{}> {

  //mixins:[TimerMixin]

  state:{
      
      }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style = {styles.scrollViewBgStyle}
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
          pagingEnabled = {true}
        >
          {this.getAllData()}
        </ScrollView>

        <View style = {styles.pageViewStyle} >
          {this.getPageView()}
        </View>
      </View>
    );
  }

  // - 返回图片
  getAllData(){
    var subViews = [];
    for(var i = 0; i < ImageData.data.length; i++){
      var model = ImageData.data[i];
      subViews.push(
          <View key = {i} style = {{height:140, backgroundColor:'red'}}>
            <Image source = {{uri: model.img}} style = {{width:screenWidht, height:120}}>
              <Text  style = {{marginTop:90}}>
                {model.title}
              </Text>
            </Image>
          </View>
      );
    }
    return subViews;
  }

  // - 返回图片
  getPageView(){
    var indicatorArr = [];
    for(var i= 0; i < ImageData.data.length; i++){
      indicatorArr.push(
          <Text key = {i} style = {{fontSize:25, color:'black'}}>
           &bull;
          </Text>
      )
    }
    return indicatorArr;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },

  scrollViewBgStyle:{
    marginTop:25,
    height:120,
    backgroundColor:'green'
  },

  pageViewStyle:{
    width:screenWidht,
    height:25,
    backgroundColor:'rgba(190, 190, 190, 0.4)',
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    alignItems:'center'
  }

});
