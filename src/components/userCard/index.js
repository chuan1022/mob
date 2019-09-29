import React, { Component } from 'react';
import styles from './index.less';
import Avatar from '@/components/avatar';
import { Button } from 'antd-mobile'
class DiscItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        user: {
            name: 'user1',
            fansNum: 100
        },
        size: 40
    }
    render() {
        return (
            <div className={`${styles['user-card']} flex justify-content-between align-items-center`}>
                <div className={`${styles['card-left']} flex `}>
                    <Avatar size={40} />
                    <div
                        style={{
                            'paddingLeft': '10px'
                        }}
                        className="">
                        <p className="font-size-14 text-color-333 line-height-20">{this.props.user.name}</p>
                        <p className="text-color-999">
                            <span
                                style={{
                                    'marginRight': '24px'
                                }}
                                className="font-size-12">粉丝：{this.props.user.fansNum}</span>
                            <span className="font-size-14">2019.10.22</span>
                        </p>
                    </div>
                </div>
                <div className={`${styles['card-right']}`}>
                    <Button inline size="small" disabled>已关注</Button>
                    <Button
                        activeClassName="vr-btn-theme-active"
                        type="primary" inline size="small" >关注</Button>
                </div>
            </div >
        );
    }
}

export default DiscItem;