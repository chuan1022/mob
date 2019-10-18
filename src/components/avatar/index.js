import React, { Component } from 'react';
import styles from './index.less';
import avatarImg from './6.jpg';
class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
      name: 'user1',
      avatarUrl: avatarImg,
    }
    render() {
        return (
            <div
                className={styles.avatar}
                style={{
                    width: this.props.size + 'px',
                    height: this.props.size + 'px'
                }}
            >
                <img
                    src={this.props.avatarUrl}
                    alt={this.props.alt}
                    width={this.props.width}
                    style={{
                        width: this.props.size + 'px',
                        height: this.props.size + 'px'
                    }} />
            </div>
        );
    }
}

export default Avatar;