import React, { Component } from 'react';
import styles from './index.less';
import Avatar from '@/components/avatar';
import defaultImg from './6.jpg';

class DiscItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // "id": 1,
    //     "title": "string",
    //     "cover_image": "string",
    //     "author_avatar": "string",
    //     "author_name": "string",
    //     "pageview": 0,
    //     "is_like": 0

    // img: pimg,
    // desc: '一个人吃了快两份了,一个人吃了快两份了一个人吃了快两份了',
    // username: 'user1',
    // zanNum: 20
    static defaultProps={
      "id": 1,
      "title": "string",
      "cover_image": defaultImg,
      "author_avatar": defaultImg,
      "author_name": "user",
      "pageview": 0,
      "is_like": 0
    }
    render() {
        return (
            <div 
            className={`${styles.item} ${this.props.type === "odd" ? styles['item-odd'] : styles['item-even']} bd-5 overflow-hidden`}>
                <div className="img-box ">
                    <img className={styles['item-img']} src={this.props.data['img']} alt="" />
                </div>
                <div className={styles['item-content']}>
                    <p
                        className={`${styles['item-desc']} ${this.props.type === "odd" ? 'ellipsis' : 'ellipsis-2'}`}>
                        {this.props.title}
                    </p>
                    <div
                        className={`${styles['item-userinfo']} f12 lh-18 flex justify-content-between align-items-center`}>
                        <div className="flex align-items-center flex-1 overflow-hidden">
                            <Avatar 
                            size={18} 
                            name={this.props.author_name}
                            avatarUrl={this.props.author_avatar}/>
                            <span className="ellipsis padding-l6">
                                {this.props.author_name}
                            </span>
                        </div>
                        <span
                            style={{
                                'backgroundPosition': '-0 -20px'
                            }}
                            className={`${styles['item-zan']} ${styles['item-zan-active']}`}>
                            {this.props.pageview}
                        </span>
                    </div>
                </div>

            </div >
        );
    }
}

export default DiscItem;