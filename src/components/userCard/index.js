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
            fansNum: 100,
            avatar:''
        },
        size: 40,
        time:'2019-01-01',
        isFollow:false
    }
    handleClickFollow(){
      
    }
    render() {
        return (
            <div className={`${styles['user-card']} flex justify-content-between align-items-center`}>
                <div className={`${styles['card-left']} flex `}>
                    <Avatar size={40} avatarUrl={this.props.user.avatar}/>
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
                            <span className="font-size-13">{this.props.time}</span>
                        </p>
                    </div>
                </div>
                <div className={`${styles['card-right']}`}>
                  {
                    this.props.isFollow?
                    <Button 
                    onClick={this.props.handleClickFollow.bind(this)} 
                    inline 
                    className="button-disabled"
                    size="small">已关注</Button>:
                    <Button
                    onClick={this.props.handleClickFollow.bind(this)}
                    activeClassName="vr-btn-theme-active"
                    type="primary" 
                    inline 
                    size="small" >关注</Button>
                  }
                </div>
            </div >
        );
    }
}

export default DiscItem;