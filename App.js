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
  //mixins: [TimerMixin],

  static defaultProps = {
    duration:1000
  }

  state = {
    currentPage:0,
    title : ImageData.data[0].title
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

            /** scrollView 的方法监听 */
            onMomentumScrollEnd = {(e)=>this.onAnimationEnd(e)}
            onScrollBeginDrag = {(e)=>this.onScrollBeginDrag(e)}
            onScrollEndDrag = {(e)=>this.onScrollEndDrag(e)}
        >

          {/** 获取轮播图的 view */}
          {this.getAllData()}

        </ScrollView>

        <View >
          <View style = {styles.pageViewStyle}>
            {/** 获取 pageView 的视图 */}
            {this.getPageView()}
            <Text style = {styles.titleStyle}>
              {this.state.title}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /** 开始耗时的操作 */
  componentDidMount(){
    this.startTimer();
  }

  /** 开始计时器 */
  startTimer(){

    /** 获取计时器 */
    var scrollView = this.refs.scrollView;
    var e = this;

    /** 设置计时器执行的方法 */
    this.timer = setInterval(function(){
      var activePage = 0;

      /** 设置当前的 page */
      if((e .state.currentPage + 1) >= ImageData.data.length){
        activePage = 0;
      }else {
        activePage = (e .state.currentPage + 1);
      }

      /**  设置当前的page 对应的偏移量 */
      var offsetx = activePage * screenWidht;

      /** scorllView 偏移 */
      scrollView.scrollResponderScrollTo({x:offsetx, y:0, animation:true});
      e.setState({
        currentPage:activePage,
        title : ImageData.data[activePage].title
      });

    }, this.props.duration);
  }

  // - 轮播图
  getAllData(){
    var subViews = [];
    for(var i = 0; i < ImageData.data.length; i++){
      var model = ImageData.data[i];
      subViews.push(
          <View key = {i} style = {{height:140, backgroundColor:'red'}}>
            <Image source = {{uri: model.img}} style = {{width:screenWidht, height:120}} />
          </View>
      );
    }
    return subViews;
  }

  // -  pageVIew
  getPageView(){
    var indicatorArr = [];
    for(var i= 0; i < ImageData.data.length; i++){
      var style = (i == this.state.currentPage) ? {color : 'orange'} : {color : 'gray'};
      indicatorArr.push(
          <Text key = {i} style = {[{fontSize:25}, style]}>
           &bull;
          </Text>
      )
    }
    return indicatorArr;
  }

  // - scrollView 的方法
  onAnimationEnd(e){
    var offsetx = e.nativeEvent.contentOffset.x;
    var currentPage = Math.floor(offsetx / screenWidht);
    this.setState({
      currentPage:currentPage
    });
  }

  onScrollBeginDrag(e){
    clearInterval(this.timer);
  }

  onScrollEndDrag(e){
    this.startTimer();
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
    alignItems:'center',
    marginLeft:10
  },

  titleStyle:{
    position:'absolute',
    right:10,
    color:'rgba(20, 20, 20, 0.4)'
  }

});
