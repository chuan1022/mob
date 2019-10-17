
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'

import Masonry from 'react-masonry-component';
import DiscItem from '@/components/discoveryItem'
import { Sticky,Tabs, PullToRefresh } from 'antd-mobile';


import './index.less';

const app = dva();

const masonryOptions = {
  // columnWidth: 150,
  transitionDuration: 0,
  gutter: 0
}

@connect(({ global ,discovery}) => ({
  global,discovery
}))

class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      activeType:1,
      page:1,
      pageSize:4,
      data:{},
      scrollDirection:'up'
    }
  }
  onScrollStart() {
    console.log('start');
  }
  componentDidMount() {
    const {dispatch} = this.props;
    //隐藏tab
    dispatch({
      type: 'global/handleChangeShowTab',
      payload:false
    })
    //获取分类
    this.getFindType();

    //获取推荐列表
    this.getAttentionList({type:0})
  }
  componentDidUpdate(prevProps,prevState){
    
  }

  getFindType(refresh){
    const {dispatch} = this.props;
    let params = {
      type:'find'
    }

    dispatch({
      type: 'discovery/getFindType',
      payload:params
    })
  }
 
  handleTabChange(tab,index){
    this.setState({
      activeType:tab.type
    })
    if(this.props.discovery.discovery['list'+tab.type].length>0) return;
    this.getAttentionList(tab)
  }
  
  getAttentionList(options,callback){
    let params={
      type:options.type,
      area_id:this.props.global.locationInfo.area_id,
      page:this.state["page"+options.type]||1,
      pageSize:this.state.pageSize
    }
    const {dispatch} = this.props;

    dispatch({
      type: 'discovery/getDiscoveryList',
      payload:params
    }).then(()=>{
      if(callback && typeof (callback) ==="function") callback()
    })
  }

  //加载更多
  handleLoadMore(options){
    let page = (this.state["page"+options.type]||1) +1;
    return new Promise(resolve=>{
      this.setState({
        ["page"+options.type]:page
      },()=>{
        this.getAttentionList(options,()=>{
          resolve()
        })
      })
    })
  }
  //下拉刷新
  handleDownRefresh(options){
    return new Promise(resolve=>{
      // this.setState({ 
      //   ['refreshing'+options.type]: true 
      // });
      this.setState({
        ["page"+options.type]:1
      },()=>{
        this.getAttentionList(options,()=>{

          resolve()
        })
      })
    })
  }
  render() {

    const {tabs}=this.props.discovery

    return (
      <div className="page-discovery page-bg" id="page-discovery">
        <div className="discovery-tab vr-tabs">
          <Tabs
            tabBarBackgroundColor='#fff'
            tabBarTextStyle={{
              'fontSize': '15px',
              'color': '#333',
              'lineHeight':'40px',
              'height':'40px'
            }}
            tabBarUnderlineStyle={{
              'display': 'none'
            }}
            style={{
              height:'40px'
            }}
            initialPage={1}
            tabs={tabs}
            renderTabBar={props => <Tabs.DefaultTabBar {...props}  />}
            onChange={(tab,index)=>this.handleTabChange(tab,index)}
          >
            {
              tabs.map((item,index)=>
                <div key={item.type} className="tab-content discovery-items-wrapper position-relative container">
                  <Scroll
                    pullUpLoadMoreData={this.handleLoadMore.bind(this,item)}
                    doPullDownFresh={this.handleDownRefresh.bind(this,item)}
                    pullUpLoad
                    pullDownRefresh
                    isPullUpTipHide={false}
                    click
                  >
                    <Masonry
                      elementType={'ul'}
                      options={masonryOptions}
                      disableImagesLoaded={false}
                      updateOnEachImageLoad={false}
                      ref={function (c) { this.masonry = this.masonry || c.masonry; }.bind(this)}
                    >
                      {
                        (this.props.discovery.discovery['list'+item.type] ?
                        this.props.discovery.discovery['list'+item.type].map(
                            (i, j) =>
                              <li
                              key={i.id}
                              data-id={i.id}
                                className={`item overflow-hidden ${(j + 1) % 2 ? 'item-odd' : 'item-even'}`}
                                key={i.id}>
                                  <Link className="link" to={`/discovery/${i.id}`}>
                                    <DiscItem data={i} type={(j + 1) % 2 ? 'odd' : 'even'} />
                                  </Link>
                              </li>
                          ) : null)
                      }
                    </Masonry>
                  </Scroll>
                </div>
              )
            }
          </Tabs>
        </div>
      </div >
    );
  }
}
export default Discovery;

// export default Discovery;