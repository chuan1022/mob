import React, { Component } from 'react';
import router from 'umi/router';
import styles from './index.less';
import Avatar from '@/components/avatar';
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
            <div className="flex align-items-center ">
              {this.props.showAddress &&
               <div
                style={{
                  flex:"0 0 75px",
                  width:'75px'
                }}
              className="text-align-center text-color-fff font-size-16">
                {this.props.address}>
              </div>
              }
             
              <div className="flex-1">
                <input
                onFocus={this.handleFocus.bind(this)} 
                className={`${styles['search-input']} font-size-15`} 
                placeholder="搜索店铺或商品"
                style={{
                  width:'100%',
                  display:'block'
                }}  type="text"/>
              </div>
              {this.props.showService &&
                <div 
                style={{
                  flex:"0 0 50px",
                  width:'50px'
                }}
                className="text-align-center text-color-fff">
                  消息
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