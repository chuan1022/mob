import React, { Component } from 'react';
import styles from './index.less';

import Avatar from '@/components/avatar';
import {WhiteSpace,Flex} from 'antd-mobile';
import defaultImg from './6.jpg';


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
        type:'discovery'
    }
    render() {

        return (
            <div className={`${styles['wrapper']} flex justify-content-between align-items-center`}>
                <div className={`${styles['flex-right']} flex align-items-top `}>

                    <img 
                    style={{
                        width:this.props.size+'px',
                        height:this.props.size+'px'
                    }}
                    className={styles['avatar']}
                    src={defaultImg} alt="" />
                    <div
                        style={{
                            'paddingLeft': '10px'
                        }}
                        className="">
                        <p className="font-size-15 font-bold text-color-333">{this.props.name}</p>
                        <Flex>
                            <Flex.Item className="text-align-center">
                                
                            </Flex.Item>

                        </Flex>
                        
                        <p className="text-color-999 margin-top-10 margin-bottom-10 flex">
                            <span
                                className="font-size-14 margin-right-15">
                                {this.props.stars}星
                            </span>
                            <span className="font-size-12 text-color-999 padding-left-15">人均{this.props.cost}元</span>
                            
                            {
                                this.props.type==='home'?
                                ( <span>{this.props.distance}m</span>)
                                :null
                            }
                           
                        </p>
                        <p className="text-color-999">
                            <span className="font-size-12">{this.props.address}</span>
                        </p>

                        {
                            this.props.type==='home'?
                            (<p className={styles['tags']}>
                            <span className={styles['tag']}>支持配送</span>
                            <span className={styles['tag']}>支持配送</span>
                            </p>)
                            :null
                        }
                    </div>
                </div>
                {
                    this.props.type==='discovery'?
                    (<div className={`$styles['flex-right'] font-size-14 text-color-999`}>
                    <span>{this.props.love_number}收藏</span>
                    </div>)
                    :null
                }
                
            </div >
        );
    }
}

export default bussCard;