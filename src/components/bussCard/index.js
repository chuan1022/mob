import React, { Component } from 'react';
import styles from './index.less';

import Star from '@/components/star';

import {WhiteSpace,Flex,Grid} from 'antd-mobile';
import defaultImg from './无店铺.png';


class bussCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        storeInfo:{
          avatarUrl:defaultImg,
          name: '杭州小笼包黄焖鸡米饭',
          stars: 4,
          cost: 66,
          address: '郑东新区东建材',
          love_number:100,
          distance:500,
          delivery:0,
          selfGet:0,
          goodsList:[],
          isRest:0
        },
        size:75,
        type:'type2',
        wrapperStyle:{},  //容器样式
        showAvatar:true,  //显示头像
        showRight:true,
        showGoods:false,    //展示商品
        showAddress:true,
        showDistance:true,
        showTags:true,
        showCost1:true,
        showCost2:true
    }
    render() {
      
        return (
            <div 
            style={this.props.wrapperStyle}
            className={`${styles['wrapper']}`}>
            <div className={`flex justify-content-between align-items-center`}>
                <div className={`${styles['flex-left']}  flex align-items-start `}>
                    {
                        this.props.showAvatar?
                        <img 
                        style={{
                            height:this.props.size+'px',
                            width:this.props.size+'px',
                            flex:`0 0 ${this.props.size}px`
                        }}
                        className={styles['avatar']}
                        src={this.props.storeInfo.avatarUrl} alt="" />:null
                    }
                   
                    <div
                        style={{
                            'paddingLeft': '10px'
                        }}
                        className="flex-1">
                        <p className="font-size-15 font-bold text-color-333">{this.props.storeInfo.name}</p>
                        {/* <Flex>
                            <Flex.Item className="text-align-center">
                            </Flex.Item>
                        </Flex> */}
                        
                        <div className="text-color-666 margin-top-10 margin-bottom-10 flex justify-content-between align-items-center">
                          <div className="flex laign-items-center">
                            <div
                              className="font-size-14 margin-right-15">
                              <Star rateValue={this.props.storeInfo.stars}></Star>
                            </div>
                            { 
                              this.props.showCost1?
                              <span className="font-size-12 text-color-666">
                                人均{Math.floor(this.props.storeInfo.cost)}元
                              </span>
                              :null
                            }
                          </div>
                            {
                             this.props.showDistance?
                              <span className="font-size-11"> &lt; {this.props.storeInfo.distance}</span>:null
                            }
                        </div>
                        {
                          this.props.showAddress?
                          <div className="flex justify-content-between text-color-666 font-size-11">
                            <p className={'ellipsis flex-1'}>
                              {this.props.storeInfo.address}
                            </p>
                            <p className=""> &lt; {this.props.storeInfo.distance}</p>
                          </div>
                         
                          :null
                        }
                        {
                          this.props.showCost2?
                          <p className="margin-top-10 margin-bottom-10">
                              <span className="font-size-12 text-color-666">人均{this.props.storeInfo.cost}元</span>
                              <span className="font-size-12 text-color-666 margin-left-15">销量{this.props.storeInfo.sales}</span>
                          </p>:null
                        }
                        {
                          this.props.showTags?
                          <p className={`${styles['tags']} margin-top-10 margin-bottom-10` }>
                            {this.props.storeInfo.isRest?
                            <span 
                            className={`${styles['tag']} ${styles['disable']}`}>休息中</span>:null}
                          </p>:null
                        }
                        {
                          this.props.showTags?
                          <p className={styles['tags']}>
                            {this.props.storeInfo.delivery?<span className={styles['tag']}>支持配送</span>:null}
                            {this.props.storeInfo.selfGet?<span className={styles['tag']}>支持自取</span>:null}
                          </p>:null
                        }
                    </div>
                </div>
                {
                    this.props.showRight?
                    (<div className={`${styles['flex-right']} font-size-14 text-color-666`}>
                      <span className={`${styles['like']} inline-block`}>{this.props.storeInfo.love_number}</span>
                    </div>)
                    :null
                }
                </div>
                {
                  this.props.storeInfo.goodsList && this.props.showGoods?
                    <div className={`${styles['foods-img-list']} `}>
                      <Grid 
                          data={this.props.storeInfo.goodsList} columnNum={3} hasLine={false}
                          square={true}
                          renderItem={
                              item=>(
                                  <div >
                                    <div  className={`${styles['foods-img-wrapper']} position-relative text-align-center`}>
                                        <img src={item.url}/>
                                        <p className={`${styles['foods-cost']} text-color-fff font-size-11 position-absolute`}>￥{item.price}</p>
                                    </div>
                                    <p 
                                    className="font-size-14 text-color-333 line-height-l ellipsis">{item.title}</p>
                                </div> 
                              ) 
                          }
                      >
                    </Grid>
                  </div>:null
                }
                
            </div >
        );
    }
}

export default bussCard;