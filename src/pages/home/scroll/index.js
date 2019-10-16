
import React, { Component } from 'react';
import dva, {connect} from 'dva';

import store from 'store';

import { WhiteSpace,Icon} from 'antd-mobile';

import ScrollList from '@/components/scrollList'

import API from '@/services'
import './index.less';

const app = dva();

@connect(({ global }) => ({
  global
}))

class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:new Array(20).fill(''),
      
    }
    this.pullingDownHandler = this.pullingDownHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.pullingUpHandler = this.pullingUpHandler.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props;
    
    this.props.dispatch({
      type: 'global/handleChangeShowTab',
      payload:false
    })
  }

  pullingDownHandler(){
    console.log('handledown')
  }
  scrollHandler(){
    console.log('scroll');
    
  }
  pullingUpHandler(){
    console.log('handleup');
  }
  componentDidUpdate(prevProps,prevState){

  }
 
 
  render() {

    const data=this.state.data
    return (
      <div id="page-scroll" ref='wrapper'>
        <div >

          <ScrollList
           height={500}
          >
            <ul className="content">
              {
                data.map((item,index)=>
                  <li key={index} className="item">
                    list{index}
                  </li>
                )
              }
            </ul>
          </ScrollList>
        </div>
        
      </div>
    );
  }
}
export default Scroll;

// export default Discovery;