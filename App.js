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

  static defaultProps = {
    duration:1000
  }

  state = {
    currentPage:0
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView
            style = {styles.scrollViewBgStyle}
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            pagingEnabled = {true}
            ref = 'scrollView'
            onMomentumScrollEnd = {(e)=>this. onAnimationEnd(e)}
        >
          {this.getAllData()}
        </ScrollView>

        <View style = {styles.pageViewStyle} >
          {this.getPageView()}
        </View>
      </View>
    );
  }

  componentDidMount(){
    this.startTimer();
  }

  startTimer(){
    var scrollView = this.refs.scrollView;
    setInterval(function(){
      this.state.currentPage;
      var activePage = 0;
      //if((this.state.currentPage + 1) >= ImageData.data.length){
      //  activePage = 0;
      //}else {
      //  activePage = (this.state.currentPage + 1);
      //}

      //this.setState({
      //  currentPage:activePage
      //});

      var offsetx = 5 * screenWidht;
      scrollView.scrollResponderScrollTo({x:offsetx, y:0, animation:true});
    }, this.props.duration);
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
      var style = (i == this.state.currentPage) ? {color : 'orange'} : {color : 'gray'};
      indicatorArr.push(
          <Text key = {i} style = {[{fontSize:25, color:'black'}, style]}>
           &bull;
          </Text>
      )
    }
    return indicatorArr;
  }

  onAnimationEnd(e){
    var offsetx = e.nativeEvent.contentOffset.x;
    var currentPage = Math.floor(offsetx / screenWidht);
    this.setState({
      currentPage:currentPage
    });
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
