
import React, { Component } from 'react';

import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import PullDown  from '@better-scroll/pull-down';

import  styles from './index.less';
BScroll.use(Pullup);
BScroll.use(PullDown);


class ScrollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPullingDown:false,
      isPullingUp:false

    }
    this.pullingDownHandler = this.pullingDownHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.pullingUpHandler = this.pullingUpHandler.bind(this);
    
  }
  static defaultProps={
    height:200
  }
  componentDidMount() {
    
    this.initScroll()
   
  }
  initScroll(){
    let wrapper = this.refs.$wrapper;
    let bs = new BScroll(wrapper, {
      click: true,
      scrollY: true,
      probeType: 3,
      pullUpLoad: true,
      threshold:50,
      stop:30
    })
    bs.on('pullingDown', this.pullingDownHandler)
    bs.on('pullingUp', this.pullingUpHandler)
  }
  pullingDownHandler(){
    console.log('handledown')
  }
  scrollHandler(){
    console.log('scroll');
    
  }
  pullingUpHandler(){
    console.log('handleup');
    this.setState({
      isPullingUp:true
    })
    
  }
  componentDidUpdate(prevProps,prevState){

  }
 
 
  render() {
    

    const data=this.state.data
    return (
      <div 
      className={`${styles['wrapper']}`}
      style={{
        height:this.props.height+'px',  
        overflow:'hidden'
      }}
      ref='$wrapper'>
        <div>
          {this.props.children}

          <div className="pullup-wrapper">
            {
              this.state.isPullingUp?
              <div className="before-trigger">
                <span className="pullup-txt">Loading... </span>
              </div>:
              <div  className="after-trigger">
                <span className="pullup-txt">Pull up and load more</span>
              </div>
            }
          </div>
        </div>

       
      </div>
     
    );
  }
}
export default ScrollList;

// export default Discovery;