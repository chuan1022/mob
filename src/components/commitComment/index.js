import React, { Component } from 'react';
import styles from './index.less';
import Avatar from '@/components/avatar';
import {List,InputItem } from 'antd-mobile';
import defaultImg from './6.jpg';

class DiscItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
     
    }
    render() {
        const data = this.props.dataList.map((el, i) => ({
            imgSrc: el,
        }));
        console.log(data);
        return (
        <div className="flex align-item-center justify-content-start">
        <Avatar size={40} />
        <List renderHeader={() => 'Whether is controlled'}>
          <InputItem
            {...getFieldProps('control')}
            placeholder="controled input"
          >受控组件</InputItem>
        </List>
      </div>)
    }
}

export default DiscItem;