import React, { Component } from 'react';
import styles from './index.less';

import { TabBar } from 'antd-mobile';

import defaultIcon from './home.png';
import defaultIcon2 from './home2.png';

const THEME_COLOR="#ED6C2D";
class VrtabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab:'home'
        }
    }
    render() {
        return (
          <TabBar
          tintColor={THEME_COLOR}
          unselectedTintColor="#333"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<img width="22px" height="22px" src ={defaultIcon} />}
            selectedIcon={<img width="22px" height="22px" src ={defaultIcon2} />}
            selected={this.state.selectedTab === 'home'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
            }}
          ></TabBar.Item>
          
          <TabBar.Item
            title="发现"
            key="discovery"
            icon={<img width="22px" height="22px" src ={defaultIcon} />}
            selectedIcon={<img width="22px" height="22px" src ={defaultIcon2} />}
            selected={this.state.selectedTab === 'discovery'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'discovery',
              });
            }}
          ></TabBar.Item>

          <TabBar.Item
            title="附近"
            key="nearby"
            icon={<img width="22px" height="22px" src ={defaultIcon} />}
            selectedIcon={<img width="22px" height="22px" src ={defaultIcon2} />}
            selected={this.state.selectedTab === 'nearby'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'nearby',
              });
            }}
          ></TabBar.Item>

          <TabBar.Item
            title="我的"
            key="my"
            icon={<img width="22px" height="22px" src ={defaultIcon} />}
            selectedIcon={<img width="22px" height="22px" src ={defaultIcon2} />}
            selected={this.state.selectedTab === 'my'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}
          ></TabBar.Item>
        </TabBar>
        );
    }
}

export default VrtabBar;