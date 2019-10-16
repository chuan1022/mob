
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import store from 'store'

import BaiduMap from '@/components/baiduMap';
import VrtabBar from '@/components/tabbar';
import Home from './home/index';

import './index.less';
import './common.less';
import '@/styles/mixins.less';

import API from '@/services'
const app = dva();

@connect(({ global }) => ({
  global
}))

class Index extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      dataList: [],
      handleOnFresh: false,
      activeType:0,
      storeList:[]
    }

  }

  componentDidMount() {
    const {dispatch} = this.props;
    
    dispatch({
      type: 'global/handleChangeShowTab',
      payload:true
    })
    this.getPosition();
  }
  componentDidUpdate(prevProps,prevState){
   
  }
 
  //获取定位
  getPosition(){
    
    let locationInfo=store.get('locationInfo'),locationPoint=store.get('locationPoint');
    console.log(locationInfo,locationPoint);

    if( !locationInfo || !locationPoint){
      new BaiduMap().getLocation(point=>{
        //存储经纬度
        this.props.dispatch({
          type: 'global/handleChangeLocationPoint',
          payload:point
        })
        //根据经纬度获取定位信息
        this.props.dispatch({
          type: 'global/getLocationInfo',
          payload:point
        });
      })
    }else{
      //存储经纬度
      this.props.dispatch({
        type: 'global/handleChangeLocationPoint',
        payload:locationPoint
      })
      //存储定位信息
      this.props.dispatch({
        type: 'global/handleChangeLocationInfo',
        payload:locationInfo
      });
    }
  
  }
  
  render() {

    return (
      <div className="page-index" id="page-index">
        {
          this.props.global.locationInfo.area_id?
          this.props.children:null
         }
         {
          this.props.global.showTab?
          <div className="tabbar">
            <VrtabBar />
          </div>:null
         }
        
      </div >
    );
  }
}
export default Index;
