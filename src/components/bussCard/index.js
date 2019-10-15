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
        size:75,
        avatarUrl:defaultImg,
        name: '杭州小笼包黄焖鸡米饭',
        stars: 4,
        cost: 66,
        address: '郑东新区东建材',
        love_number:100,
        distance:500,
        tag:['支持配送','到店自取','免费配料','急速配送'],
        delivery:false,
        selfGet:false,
        type:'type2',
        foodsImgList:[{
            imgUrl:defaultImg,
            cost:10,
            name:'小笼包1'
        },{
            imgUrl:defaultImg,
            cost:120,
            name:'小笼包2'
        },{
            imgUrl:defaultImg,
            cost:100,
            name:'小笼包3'
        }]
    }
    render() {

        return (
            <div className={`${styles['wrapper']} `}>
            <div className={`flex justify-content-between align-items-center`}>
                <div className={`${styles['flex-left']}  flex align-items-start `}>
                    {
                        (this.props.type==="type1"||this.props.type==="type2")&&
                        <img 
                        style={{
                            height:this.props.size+'px',
                            width:this.props.size+'px',
                            flex:`0 0 ${this.props.size}px`
                        }}
                        className={styles['avatar']}
                        src={this.props.avatarUrl} alt="" />
                    }
                   
                    <div
                        style={{
                            'paddingLeft': '10px'
                        }}
                        className="flex-1">
                        <p className="font-size-15 font-bold text-color-333">{this.props.name}</p>
                        {/* <Flex>
                            <Flex.Item className="text-align-center">
                            </Flex.Item>
                        </Flex> */}
                        
                        <div className="text-color-999 margin-top-10 margin-bottom-10 flex justify-content-between align-items-center">
                            <div
                                className="font-size-14 margin-right-15">
                                <Star rateValue={this.props.stars}></Star>
                            </div>
                            {
                                this.props.type==="type2"&&
                                <span className="font-size-12 text-color-999 padding-left-15">人均{this.props.cost}元</span>
                            }
                            
                            {
                                (this.props.type==='type1'|| this.props.type==='type3')&&
                                <span className="font-size-11"> &lt; {this.props.distance}</span>
                            }
                           
                        </div>
                        {
                            this.props.type==="type2"&&
                            <p className="text-color-999">
                                <span className="font-size-12">{this.props.address}</span>
                            </p>
                        }
                         {
                            this.props.type==="type1"&&
                            <p className="margin-top-10 margin-bottom-10">
                                <span className="font-size-12 text-color-999">人均{this.props.cost}元</span>
                            </p>
                        }

                        {
                           (this.props.type==='type1'|| this.props.type==='type3')&&
                            <p className={styles['tags']}>
                              {this.props.delivery?<span className={styles['tag']}>支持配送</span>:null}
                              {this.props.selfGet?<span className={styles['tag']}>支持自取</span>:null}
                            </p>
                        }
                    </div>
                </div>
                {
                    this.props.type==='type2'?
                    (<div className={`${styles['flex-right']} font-size-14 text-color-999`}>
                    <span>{this.props.love_number}收藏</span>
                    </div>)
                    :null
                }
                </div>
                {

// id: 16
// price: "12.00"
// store_id: 2
// title: "测试商品123123123"
// url: "store_avatar/2019-10-09/yhbfGJnBLzsTLoC83jK0k8BqXG2I0xvzwOWuevyJ.png"
                    this.props.goods && this.props.type==='type1'?
                    <div className={`${styles['foods-img-list']} `}>

                        {/* <Flex>
                      {  this.props.foodsImgList.map((item,index)=>

                           <Flex.Item className="text-align-center margin-right-10" key={index}> 
                               <div className={`$styles['foods-img'] `}>
                                    <div className="position-relative">
                                        <img width="100%" height="100%" src={item.imgUrl}/>
                                        <p className="">￥{item.cost}</p>
                                    </div>
                                    <p>{item.name}</p>
                                </div> 
                           </Flex.Item>
                        )}

                        </Flex> */}
                        <Grid 
                            data={this.props.goods} columnNum={3} hasLine={false}
                            square={true}
                            renderItem={
                                item=>(
                                    <div 
                                   >
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
                        
                    {/* {
                        this.props.foodsImgList.map((val,index)=>
                            <img 
                            style={{
                                width:this.props.size+'px',
                                height:this.props.size+'px'
                            }}
                            className={styles['avatar']}
                            src={defaultImg} alt="" />
                        )
                    } */}
                </div>:null
                }
                
            </div >
        );
    }
}

export default bussCard;