import React, { Component } from 'react';
import styles from './index.less';
import Avatar from '@/components/avatar';

import { Grid, WhiteSpace } from 'antd-mobile';
import defaultImg from './6.jpg';

class DiscItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        dataList: [
            defaultImg, defaultImg, defaultImg, defaultImg, defaultImg
        ],
        text: ` 这家店真的是太好吃了！抗拒不了的那种味道啊，带
        着朋友也去啦，很符合我们的口味，真的是非常不错
        啊，不知道该说啥了，就这样吧反正这也是占位符，
        真心推荐，真心推荐，真心推荐，重要的事要说三遍
        啊！！！`
    }
    render() {
        const data = this.props.dataList.map((el, i) => ({
            imgSrc: el,
        }));
        console.log(data);
        return (
          <div className={`${styles['wrapper']}`}>
              <Grid
                hasLine={false}
                columnNum={3}
                renderItem={dataItem => (
                    <div style={{
                        padding: '5px',
                        height: '112px'
                    }}>
                        <img className="bd-5"
                            src={dataItem.imgSrc}
                            style={{ width: '100%', height: '100%' }} alt="" />
                    </div>
                )}
                data={data} />
            <WhiteSpace />
            <div className="text-color-333 font-size-15 line-height-19">
              {this.props.text}
            </div>
            <WhiteSpace />
          </div >
        );
    }
}

export default DiscItem;