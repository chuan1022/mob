
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Carousel, WhiteSpace,Flex,NoticeBar,Icon,Grid} from 'antd-mobile';

import {findType,finding} from '@/services/discovery';

import VrtabBar from '@/components/tabbar'
import BussCard from '@/components/BussCard'

import './index.less';
import '@/styles/mixins.less';

import defaultImg from './6.jpg';
import defaultIcon from './icon1.png';
import defaultFood from './png1.png';

const app = dva();

const masonryOptions = {
  // columnWidth: 150,
  transitionDuration: 0,
  gutter: 0
}

@connect(({ count }) => ({
  count
}))

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      dataList: [],
      handleOnFresh: false,
      activeType:0,
      bannerList:[defaultImg,defaultImg,defaultImg ]
    }

    this.getFindType = this.getFindType.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        bannerList:[defaultImg,defaultImg,defaultImg ]
      });
    }, 100);
    
  }
  componentDidUpdate(prevProps,prevState){
   
  }
  getFindType(refresh){
   if(this.state.tabs.length && !refresh) return;
    findType({
      type:'find'
    }).then(res=>{
      let tabs=[];
      res.data.forEach(el => {
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
  getAttentionList(){
    let para ={
      type:this.state.activeType,
      user_id:this.state.user_id,
      lon:this.state.lon,
      lat:this.state.lat,
      page:this.state.currentPage,
      pageSize:this.state.currentPageSize
    }
    let data =  [{
        "id": 1,
        "title": "string",
        "cover_image": "string",
        "author_avatar": "string",
        "author_name": "string",
        "pageview": 0,
        "is_like": 0
      },{
        "id": 2,
        "title": "string",
        "cover_image": "string",
        "author_avatar": "string",
        "author_name": "string",
        "pageview": 0,
        "is_like": 0
      }];
      this.setState({
        dataList:data
      })
  }

  render() {
    return (
      <div className="page-home page-bg full-wrapper" id="page-home">
        <div className="main-wrapper">

          {/* search */}
         
          <div className="top-header">
            <div className="flex align-items-center ">
              <div className="padding-right-10">
                郑州
              </div>
              <div className="flex-1">
                <input style={{
                  width:'100%',
                  display:'block'
                }}  type="text"/>
              </div>
              <div className="padding-left-15">
                客服
              </div>
            </div>
          </div>
          <div className="content-wrapper">

            {/* banner */}
            <div className="banner-wrapper">
              <Carousel
                autoplay={true}
                infinite
                dots={false}
                cellSpacing={20}
              >
                {this.state.bannerList.map((val,index) => (
                  <a
                    key={index}
                    href="/"
                    style={{ 
                      display: 'inline-block', 
                      width: '100%', 
                      height: '150px',
                      overflow:'hidden',
                      borderRadius:'6px'
                     }}
                  >
                    <img
                      src={val}
                      alt="bannerimg"
                      style={{ width: '100%', height: '150px' }}
                      // onLoad={() => {
                      //   // fire window resize event to change height
                      //   window.dispatchEvent(new Event('resize'));
                      //   this.setState({ imgHeight: 'auto' });
                      // }}
                    />
                  </a>
                ))}
              </Carousel>
            </div>
 
            {/* nav */}
            <div className="nav-wrapper">
              <WhiteSpace size="xl" />
              <Flex  wrap='nowrap' justify="center" align="center">
                <Flex.Item className="text-align-center">
                  <img width="40" height="40" src={defaultIcon} alt=""/>
                  <p className="text-color-333 font-size-13 padding-top-10">美食</p>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <img width="40" height="40" src={defaultIcon} alt=""/>
                  <p className="text-color-333 font-size-13 padding-top-10">美食</p>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <img width="40" height="40" src={defaultIcon} alt=""/>
                  <p className="text-color-333 font-size-13 padding-top-10">美食</p>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <img width="40" height="40" src={defaultIcon} alt=""/>
                  <p className="text-color-333 font-size-13 padding-top-10">美食</p>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <img width="40" height="40" src={defaultIcon} alt=""/>
                  <p className="text-color-333 font-size-13 padding-top-10">美食</p>
                </Flex.Item>
              </Flex>
              <WhiteSpace size="lg" />
            </div>

            {/* notice */}
            <div className="notice-wrapper">
              <WhiteSpace size="md" />
              <NoticeBar marqueeProps={{ 
                loop: true, 
                style: { padding: '0 7.5px' } 
                }}>
                全景智慧城市：签到送积分，好礼享不停
              </NoticeBar>
              <WhiteSpace size="md" />
            </div>
            
            {/* ca2 */}
            <div className="actives-wrapper">
              <Carousel
                autoplay={true}
                infinite
                dots={false}
                cellSpacing={20}
              >
                {this.state.bannerList.map((val,index) => (
                  <a
                    key={index}
                    href="/"
                    style={{ 
                      display: 'inline-block', 
                      width: '100%', 
                      height: '67px',
                      overflow:'hidden',
                      borderRadius:'6px'
                     }}
                  >
                    <img
                      src={val}
                      alt="bannerimg"
                      style={{ width: '100%', height: '100%' }}
                      // onLoad={() => {
                      //   // fire window resize event to change height
                      //   window.dispatchEvent(new Event('resize'));
                      //   this.setState({ imgHeight: 'auto' });
                      // }}
                    />
                  </a>
                ))}
              </Carousel>
            </div>
            
            <WhiteSpace size="lg"/>
            {/* panle1 */}
            <div className="topactive-wrapper">
              <Grid 
                data={new Array(4)}
                // hasLine={false}
                columnNum={2}
                activeStyle={false}
                renderItem={dataItem => (
                  <div style={{ padding: '10px',textAlign:'left' }}>
                    <p className="font-size-15 text-color-333 font-weight-bold line-height-l">全景团</p>
                    <p className="font-size-12 text-color-999 line-height-20 line-height-s">每日上新</p>
                    <WhiteSpace />
                    <Flex>
                      <Flex.Item className="text-align-center margin-right-10">
                        <img width="100%" height="100%" src={defaultFood} alt=""/>
                        <p className=" padding-top-5">
                          <span className="font-size-12 text-color-theme">￥399</span>
                          <span 
                          style={{
                            fontSize:'10px'
                          }}
                          className=" text-color-666">￥299</span>
                        </p>
                      </Flex.Item>
                      <Flex.Item className="text-align-center margin-right-10">
                        <img width="100%" height="100%" src={defaultFood} alt=""/>
                        <p className=" padding-top-5">
                          <span className="font-size-12 text-color-theme">￥399</span>
                          <span 
                          style={{
                            fontSize:'10px'
                          }}
                          className=" text-color-666">￥299</span>
                        </p>
                      </Flex.Item>
                    </Flex>
                  </div>
                )}
              />
            </div>
            <WhiteSpace size="lg"/>
            
            {/* 精选推荐 */}
            <div className="recommend-wrapper">
              <div className="recommend-title text-align-center">
                <h3 className="text-color-666 font-size-17 line-height-m">精选推荐</h3>
                <p className="text-color-999 font-size-12 line-height-m">小编为你整理的品质好店</p>
                <WhiteSpace size="lg"/>
              </div>
              <div className="recommend-content">
                <BussCard />
                <WhiteSpace size="lg"/>
                <BussCard />
                <WhiteSpace size="lg"/>
                <BussCard />
                <WhiteSpace size="lg"/>
                <BussCard />
                <WhiteSpace size="lg"/>
                <BussCard />
                <WhiteSpace size="lg"/>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tabbar">
          <VrtabBar />
        </div>
      </div >
    );
  }
}
export default Home;
