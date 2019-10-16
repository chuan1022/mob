import React, { Component } from 'react';
import styles from './index.less';

import {Icon} from 'antd-mobile';
class Star extends React.Component {

  constructor (props) {
      super(props)
      this.state = {
          rateValue: 0,
          rateArray: new Array(Number(props.rateNum)).fill('')
      }
  }

  static defaultProps = {
    canClick: false,
    rateNum: 5,
    handleSelectRate: null,
    rateValue: 0
  }
  handleSelectRate (value) {
      if (!this.props.canClick) {
          return
      }
      this.setState({
          rateValue: value
      })
      this.props.handleSelectRate && this.props.handleSelectRate(value)
  }

  render () {
      const {rateArray, rateValue} = this.state
      
      const {rateNum} = this.props
      return (
          <div className={`${styles["rate"]}`}>
              <div className={`${styles["rate__bg"]}`}>
                  {
                    rateArray.map((item, index) => 
                    <span className={`${styles["star"]} ${styles["star1"]}`} onClick={() => this.handleSelectRate(index+1)} key={`rate_${index}`}></span>)
                    }
                  <div 
                  className={`${styles["bg__realrate"]}`} 
                  style={{width: `calc(${rateValue ? rateValue : this.props.rateValue} / ${rateNum} * 100%)`}}>
                      {rateArray.map((item, index) => 
                      <span className={`${styles["star"]} ${styles["star2"]}`}  onClick={() => this.handleSelectRate(index+1)} key={`rate_selected_${index}`}></span>)}
                  </div>
              </div>
          </div>
      )
  }
}

export default Star