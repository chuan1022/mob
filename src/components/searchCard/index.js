import React, { Component } from 'react';
import router from 'umi/router';
import styles from './index.less';
import Avatar from '@/components/avatar';
import {Icon} from 'antd-mobile';
class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        address:'定位',
        showAddress:true,
        showAvatar:true,
        showService:true
    }
    handleFocus(){
      router.push('/search');
    }
    render() {
        return (
            <div className="flex align-items-center padding-row-15">
              {this.props.showAddress &&
               <div
                style={{
                  flex:"0 0 75px",
                  width:'75px'
                }}
              className="text-align-center text-color-fff font-size-16 flex align-items-center">
                <span>{this.props.address}</span>
                <Icon type="right" /> 
              </div>
              }
             
              <div className="flex-1">
                <input
                onFocus={this.handleFocus.bind(this)} 
                className={`vr-input vr-input-search font-size-15`} 
                placeholder="搜索店铺或商品"
                style={{
                  width:'100%',
                  display:'block'
                }}  type="text"/>
              </div>
              {this.props.showService &&
                <div 
                style={{
                  flex:"0 0 30px",
                  width:'30px'
                }}
                className="text-align-center text-color-fff">
                  <img width="20" src={require('./首页-客服.png')} alt="客服"/>
                </div>
              }
              {this.props.showAvatar &&
                <div 
                style={{
                  flex:"0 0 50px",
                  width:'50px'
                }}
                className="flex justify-content-around">
                  <Avatar 
                    
                  size={34}></Avatar>
                </div>
              }
            </div>
          );
    }
}

export default SearchCard;