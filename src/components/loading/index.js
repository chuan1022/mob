import React, { Component } from 'react';
import styles from './index.less';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {

    }
    render() {
        return (
            <div >
              <p className="text-align-center line-height-l text-color-999 font-size-14">loading......</p> 
            </div>
        );
    }
}

export default Loading;