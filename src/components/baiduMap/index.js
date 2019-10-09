import React, { Component } from 'react';
import styles from './index.less';
import avatarImg from './6.jpg';
import BMap from 'BMap';

class BaiduMap {
    constructor() {
        
    }
    getLocation(callback){
      let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            callback && callback(r.point)
            // return r.point;
          }
          else {
            console.log('failed'+this.getStatus());
            return 'failed'+this.getStatus();
          }        
        });
    }
}

export default BaiduMap;