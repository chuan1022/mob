
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'

import Masonry from 'react-masonry-component';
import dataList from './dadta';
import DiscItem from '@/components/discoveryItem'
import { Sticky,Tabs, PullToRefresh } from 'antd-mobile';


import request from 'umi-request';
import API from '@/services'
import './index.less';
import '@/styles/mixins.less';
const app = dva();

const masonryOptions = {
  // columnWidth: 150,
  transitionDuration: 0,
  gutter: 0
}

@connect(({ global }) => ({
  global
}))

class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
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
      //隐藏tab
    this.props.dispatch({
      type: 'global/handleChangeShowTab',
      payload:false
    })

    this.getFindType();
    this.getAttentionList({
      type:0
    })
  }
  componentDidUpdate(prevProps,prevState){
    
  }

  getFindType(refresh){
   if(this.state.tabs.length && !refresh) return;
   API.findType({
      type:'find'
    }).then(res=>{
      let tabs=[];
      res.forEach(el => {
        tabs.push({
          title:el.name,
          type:el.type
        })
      });

      this.setState({
        tabs:tabs,
      })

      console.log(this.state.tabs);
    }).catch(err=>{
      console.log(err);
    })
  }
 
  handleTabChange(tab,index){
    console.log(tab);
    this.setState({
      activeType:tab.type
    })
    if(this.state['list'+tab.type]) return;
    this.getAttentionList(tab)
  }
  
  getAttentionList(options,callback){
    let para ={
      type:options.type,
      area_id:this.props.global.locationInfo.area_id,
      page:this.state["page"+options.type]||1,
      pageSize:this.state.pageSize
    }
    console.log(para);
    
    API.finding(para).then(res=>{
      let data ;
      if(para.page==1){
        data=[]
      }else{
        data=this.state["list"+options.type]||[];
      }
      data = data.concat(res)
      console.log(data)
      this.setState({
        ['list'+options.type]:data,
        ["page"+options.type]:para.page
      }) 
      if(callback && typeof (callback) ==="function") callback()
    })
  }
  //加载更多
  handleLoadMore(options){
    let page = this.state["page"+options.type]+1;

    
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
          // this.setState({ 
          //   ['refreshing'+options.type]: false 
          // });
          resolve()
        })
      })
    })
  }
  //handle refresh
  // handleOnFresh(options) {
    
  //   if(this.state.scrollDirection==="down"){
  //     this.handleDownRefresh(options)
  //   }else if(this.state.scrollDirection==="up"){
  //       this.handleLoadMore(options)
  //   }
  // } 

  render() {
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
            tabs={this.state.tabs}
            renderTabBar={props => <Tabs.DefaultTabBar {...props}  />}
            onChange={(tab,index)=>this.handleTabChange(tab,index)}
          >
            {
              this.state.tabs.map((item,index)=>
                <div key={item.type} className="tab-content discovery-items-wrapper position-relative container">
                  <Scroll
                    pullUpLoadMoreData={this.handleLoadMore.bind(this,item)}
                    doPullDownFresh={this.handleDownRefresh.bind(this,item)}
                    pullUpLoad
                    pullDownRefresh
                    isPullUpTipHide={false}
                  >
                    <Masonry
                      elementType={'ul'}
                      options={masonryOptions}
                      disableImagesLoaded={false}
                      updateOnEachImageLoad={false}
                      ref={function (c) { this.masonry = this.masonry || c.masonry; }.bind(this)}
                    >
                      {
                        (this.state['list'+item.type] ?
                        this.state['list'+item.type].map(
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
                  
                  {/* <PullToRefresh
                    damping={60}
                    refreshing={this.state['refreshing'+item.type]}
                    onRefresh={this.handleOnFresh.bind(this,item)}
                    distanceToRefresh={40}
                    indicator={{
                      deactivate:'上拉加载更多',
                      activate:'松开加载',
                      release:'加载中...',
                      finish:'加载完成'
                    }}
                    direction={this.state.scrollDirection}
                    className="refresh-wrapper"
                    style={{
                      overflow:'auto',
                      height:document.documentElement.clientHeight-40,
                      paddingTop:'20px'
                    }}
                  >
                    <Masonry
                      elementType={'ul'}
                      options={masonryOptions}
                      disableImagesLoaded={false}
                      updateOnEachImageLoad={false}
                      ref={function (c) { this.masonry = this.masonry || c.masonry; }.bind(this)}
                    >
                      {
                        (this.state['list'+item.type] ?
                        this.state['list'+item.type].map(
                            (i, j) =>
                              <li
                                className={`item overflow-hidden ${(j + 1) % 2 ? 'item-odd' : 'item-even'}`}
                                key={i.id}>
                                  <Link className="link" to={`/discovery/${i.id}`}>
                                    <DiscItem data={i} type={(j + 1) % 2 ? 'odd' : 'even'} />
                                  </Link>
                              </li>
                          ) : null)
                      }
                    </Masonry>
                  </PullToRefresh> */}
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