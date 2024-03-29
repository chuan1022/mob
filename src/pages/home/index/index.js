
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import store from 'store'

import { Carousel, WhiteSpace,Flex,NoticeBar,Icon,Grid} from 'antd-mobile';

import BussCard from '@/components/bussCard';
import SearchCard from '@/components/searchCard';
import Loading from '@/components/loading';

import './index.less';
import '@/styles/mixins.less';

import defaultImg from './6.jpg';
import defaultIcon from './food.png';
import defaultFood from './png1.png';

import API from '@/services'
const app = dva();

@connect(({ global,index }) => ({
  global,index
}))

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      dataList: [],
      handleOnFresh: false,
      activeType:0,
      bannerList:[defaultImg,defaultImg,defaultImg ],
      isStoreLoading:true
    }

  }

  componentDidMount() {
    const {dispatch} = this.props;
    
    dispatch({
      type: 'global/handleChangeShowTab',
      payload:true
    })

    this.getCommStoreList();
  }
  componentDidUpdate(prevProps,prevState){
   
  }
  //获取大banner
    getTopBanner(){

    }
  //获取小banner
  getLittBanner(){
    
  }
  
  //获取推荐商家列表
  getCommStoreList(){
    let para ={
      lat:this.props.global.locationPoint.lat,
      lng:this.props.global.locationPoint.lng,
    }
    const {dispatch} = this.props;

     dispatch({
      type: 'index/getStoreList',
      payload:para
    }).then(()=>{
      this.setState({
        isStoreLoading:false
      })
    })
  }

  render() {

    const storeList = this.props.index.storeList
    return (
      <div className="page-home page-bg " id="page-home">
        <div className="main-wrapper">
          {/* search */}
          <div className="top-header">
            
            <SearchCard 
            showAvatar={false}
            address={this.props.global.locationInfo&&this.props.global.locationInfo.city_name}>
            </SearchCard>
          </div>
          <div className="banner-bg">
            <div className="top-bg"></div>
            <div className="bottom-bg"></div>
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
                  <Link to="/food">
                    <img 
                    width="40" 
                    height="40" 
                    src={require('./首页-美食.png')} alt="美食"/>
                    <p className="text-color-333 font-size-13 padding-top-10">美食</p>
                  </Link>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <Link to="/list?industry_id=hotel">
                    <img 
                      width="40" 
                      height="40" 
                      src={require('./首页-酒店.png')} alt="酒店"/>
                    <p className="text-color-333 font-size-13 padding-top-10">酒店</p>
                  </Link>
                  
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <Link to="/list?industry_id=toruism">
                    <img 
                      width="40" 
                      height="40" 
                      src={require('./首页-旅游.png')} alt="旅游"/>
                    <p className="text-color-333 font-size-13 padding-top-10">旅游</p>
                  </Link>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <Link to="/list?industry_id=entertainment">
                    <img 
                        width="40" 
                        height="40" 
                        src={require('./首页-娱乐.png')} alt="娱乐"/>
                      <p className="text-color-333 font-size-13 padding-top-10">娱乐</p>
                  </Link>
                </Flex.Item>
                <Flex.Item className="text-align-center">
                  <Link to="/list?industry_id=other">
                  <img 
                    width="40" 
                    height="40" 
                    src={require('./首页-其他.png')} alt="其他"/>
                    <p className="text-color-333 font-size-13 padding-top-10">其他</p>
                </Link>
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
                hasLine={false}
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
                {
                   this.state.isStoreLoading?
                   <Loading></Loading> :
                   <div className="recommend-content">
                  {
                    storeList.map((item,index)=>
                      <div key={index}>
                        <BussCard
                          storeInfo={{
                            avatarUrl:item.image,
                            name: item.title,
                            stars: item.evaluation,
                            cost: item.per_capita,
                            address: '郑东新区东建材',
                            love_number:100,
                            distance:item.distance,
                            delivery:item.is_delivery,
                            selfGet:item.is_self_get,
                            isRest:item.is_rest,
                            goodsList:item.goods
                          }}
                          size={104}
                          showAvatar={item.goods?false:true}
                          showAddress={false}
                          showGoods={true}
                          showRight={false}
                          showCost1={false}
                          type='type1'/>
                        <WhiteSpace size="lg"/>
                      </div>
                      )
                    }
                  </div>
                }
                
              </div>
            
          </div>
        </div>
      </div >
    );
  }
}
export default Home;
