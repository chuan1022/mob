import React, { Component } from 'react';
import styles from './index.less';

import Avatar from '@/components/avatar';

import defaultImg from './6.jpg';

class bussCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        data: {
            avatarUrl: defaultImg,
            name: '杭州小笼包黄焖鸡米饭',
            stars: 4,
            cost: 66,
            address: '郑东新区东建材',
            love_number:100
        }
    }
    render() {

        return (
            <div className={`${styles['wrapper']} flex justify-content-between align-items-center`}>
                <div className={`${styles['flex-right']} flex align-items-top `}>

                    <img className={styles['avatar']} src={defaultImg} alt="" />
                    <div
                        style={{
                            'paddingLeft': '10px'
                        }}
                        className="">
                        <p className="font-size-15 font-bold text-color-333 line-height-20">{this.props.data.name}</p>
                        <p className="text-color-999 margin5-t margin5-b">
                            <span
                                className="font-size-14 margin15-r">
                                {this.props.data.stars}星
                            </span>
                            <span className="font-size-12 text-color-999 padding-left-15">人均{this.props.data.cost}元</span>
                        </p>
                        <p className="text-color-999">
                            <span className="font-size-12">{this.props.data.address}</span>
                        </p>
                    </div>
                </div>
                <div className={styles['flex-right']}>
                    <span>{this.props.data.love_number}</span>
                </div>
            </div >
        );
    }
}

export default bussCard;