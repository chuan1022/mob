import React, { Component } from 'react';
import styles from './index.less';
import Avatar from '@/components/avatar';
import defaultImge from './6.jpg';

class DiscItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps={
      data:{
        "id": 1,
        "title": "string",
        "cover_image": '',
        "author_avatar": '',
        "author_name": "user",
        "pageview": 0,
        "is_like": 0
      }
    }
    render() {
        return (
            <div 
            className={`${styles.item} ${this.props.type === "odd" ? styles['item-odd'] : styles['item-even']} bd-5 overflow-hidden`}>
                <div className={styles['img-box']}>
                    <img 
                    className={styles['item-img']} 
                    // src={this.props.data.cover_image}
                    src={defaultImge} 
                    />
                </div>
                <div className={styles['item-content']}>
                    <p
                        className={`${styles['item-desc']}`}>
                        {this.props.data.title}
                    </p>
                    <div
                        className={`${styles['item-userinfo']} f12 lh-18 flex justify-content-between align-items-center`}>
                        <div className="flex align-items-center flex-1 overflow-hidden ">
                            <Avatar 
                            size={18} 
                            name={this.props.data.author_name}
                            // avatarUrl={this.props.data.author_avatar}
                            avatarUrl={defaultImge}
                            />
                            <span className="ellipsis padding-l6 text-color-333 font-size-11">
                                {this.props.data.author_name}
                            </span>
                        </div>
                        <span
                          className={`${styles['item-zan']} ${this.props.data.is_like?styles['item-zan-active']:''} text-color-999`}>
                          {this.props.data.like_num}
                        </span>
                    </div>
                </div>

            </div >
        );
    }
}

export default DiscItem;