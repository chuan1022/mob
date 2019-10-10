
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Tabs,WhiteSpace ,Carousel,Accordion,List } from 'antd-mobile';
import Masonry from 'react-masonry-component';
import dataList from './dadta';
import DiscItem from '@/components/discoveryItem';
import SearchCard from '@/components/searchCard';
import BussCard from '@/components/bussCard';

import defaultImg from './无商品.png';


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

class BussListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      dataList: [],
      handleOnFresh: false,
      activeType:0,
      open:false,
      activeFirList:0,
      activeSecList:0,
      navData:[],
      firClassId:0,
      secClassId:0,
      page:1,
      pageSize:10,  
      storeList:[],  //店铺列表
      bannerList:[defaultImg,defaultImg,defaultImg ]
    }
    this.handelTabClick = this.handelTabClick.bind(this);
    this.handleFirNavClick = this.handleFirNavClick.bind(this);
    this.handleSecNavClick = this.handleSecNavClick.bind(this);
    this.getStoreClassList = this.getStoreClassList.bind(this);
  }

  componentDidMount() {
    this.getStoreClassList();
  }
  componentDidUpdate(prevProps,prevState){
    
  }
  getTabscList(data){
    let tabs=[];
    data.forEach(el => {
      tabs.push({
        title:el.name,
        id:el.id
      })
    });

    this.setState({
      tabs:tabs,
    })
  }
  getStoreClassList(){
    let params={
      type:'food',
      area_id:20
    }
    API.getStoreClassList(params).then(res=>{
      console.log(res);
      this.getTabscList(res.recommend)
      this.setState({
        navData:res.list
      });
    })
  }
  handelTabClick(tab,index){
    this.setState({
      activeType:tab.type
    })
  }
  handleChangeClassID(val){
    
  }

  handleOnFresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  handleFirNavClick(index){
    console.log(index);
    this.setState({
      activeFirList:index
    })
  }
  handleSecNavClick(firIndex,secIndex,firId,secId){
    //切换分类
    this.setState({
      activeSecList:secIndex,
      firClassId:firId,
      secClassId:secId
    })
    this.getTabscList(this.state.navData[firIndex].children);
    this.getStoreList(secId);
  }
  getStoreList(id){
    
    let params={
      lng:this.props.global.locationInfo.lng,
      lat:this.props.global.locationInfo.lat,
      class_id:id,
      // keyword:'',
      // sort_by:'complex',// 排序方式:complex=综合排序,praise=好评优先,high_per_capita=人均最高,low_per_capita=人均最低,nearby=离我最近,sales_volume=销量
      // page:this.state.curPage,
      // pageSize:this.state.pageSize,
      // new_store:false,
      // is_delivery:false,
      // is_self_get:false
    }

    API.getStoreList(params).then(res=>{
      console.log(res);
      this.setState({
        storeList:res
      })
    })

  }
  render() {
    return (
      <div className="page-list page-bg positon-relative" id="page-list">

        {/* 顶部导航 */}
        <div className="border-box top-wrapper ">
          {/* 顶部 */}
          <div style={{
            zIndex:2
          }} className="position-relative bg-color-theme padding-row-15 ">
            <WhiteSpace/>
            <SearchCard 
              showAddress={false}
              showService={false}
            >
              </SearchCard>
            <WhiteSpace size="lg"/>
            {/* tab */}
            <div className="list-tab vr-tabs position-relative ">
              <Tabs
                tabBarBackgroundColor='#ED6C2D'
                tabBarTextStyle={{
                  'fontSize': '15px',
                  'color': '#fff'
                }}
                tabBarUnderlineStyle={{
                  'display': 'none'
                }}
                tabs={this.state.tabs}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} 
                page={4} />}
                onTabClick={(tab,index)=>this.handelTabClick(tab,index)}
              >
              </Tabs>
            
              <div 
              onClick={this.onOpenChange}
              className="down-button text-color-fff bg-color-theme flex align-items-center justify-content-center">
                >
              </div>
            </div>
          
          </div>
         {/* 下拉nav */}
         
            <div className={`downpanal-nav bg-color-white flex position-relative ${this.state.open?'open':''}`}>
              <div
              style={{
                flex:'0 0 130px'
              }}
              className="panale-left">
                <ul className="firstList">
                  {this.state.navData.map((el,index)=>
                    <li 
                    onClick={this.handleFirNavClick.bind(this,index)}
                    className={`${this.state.activeFirList===index ?'active':''} item flex align-items-center justify-content-between`} 
                    key={el.id}>
                      <span className="lable text-color-666 font-size-15">{el.name}</span>
                      <span className="number font-size-11 text-color-999">{el.num}</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="panle-right flex-1">
                <div>
                  {this.state.navData.map((el,index)=>
                  this.state.activeFirList===index && 
                  <ul className="secList" key={index}>
                        {
                          el.children.map((e,i)=>
                          <li
                          onClick={this.handleSecNavClick.bind(this,index,i,el.id,e.id)}
                          key={e.id} 
                          className={`${this.state.firClassId===el.id&& this.state.secClassId===e.id?'active':''}  item flex align-items-center justify-content-between`}>
                            <div className="flex align-items-center">
                              <img width="44" height="32" src={e.icon||defaultImg} alt=""/>
                              <span className="margin-left-10 lable text-color-666 font-size-15">{e.name}</span>
                            </div>
                            <span className="number font-size-11 text-color-999">{e.num}</span>
                          </li>)
                        }
                    </ul>
                    )
                  }
                </div>
              </div>
            </div>
        </div>
                
        {/* 轮播图 */}
        <div className="padding-row-15 margin-top-15 margin-bottom-15">
        <Carousel
          autoplay={true}
          infinite
          dots={false}
          cellSpacing={15}
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
        {/* 筛选 */}
        <div 
        className="flex justify-content-between 
        bg-color-white line-height-l padding-column-10 pick-wrapper">
          <div className="">
            <p className="inline-block">     
              <Accordion defaultActiveKey="0" className="my-accordion" >
                <Accordion.Panel
                 header={
                 <span className="font-size-15 font-blod">综合排序</span> 
                }>
                  <List className="my-list">
                    <List.Item>综合排序</List.Item>
                    <List.Item>好评优先</List.Item>
                    <List.Item>人均最高</List.Item>
                    <List.Item>人均最低</List.Item>
                    <List.Item>离我最近</List.Item>
                    <List.Item>销量</List.Item>
                  </List>
                </Accordion.Panel>
              </Accordion>
            </p>
            <p className="inline-block">距离</p>
            <p className="inline-block">销量</p>
          </div>
          <p>
            <Accordion defaultActiveKey="0" className="my-accordion" >
             <Accordion.Panel
              header={
              <span className="font-size-15 font-blod">筛选</span> 
            }>
              <List className="my-list">
                <List.Item>综合排序</List.Item>
                <List.Item>好评优先</List.Item>
              </List>
              </Accordion.Panel>
            </Accordion>
          </p>
        </div>


        {/* 列表 */}
        <div className="store-list-wrapper padding-row-15">
          <BussCard size={104} type="type1"/>
          <WhiteSpace />
          <BussCard size={104} type="type1"/>
          <WhiteSpace />
          <BussCard size={104} type="type1"/>
          <WhiteSpace />
          <BussCard size={104} type="type1"/>
          <WhiteSpace />
          <BussCard size={104} type="type1"/>
          <WhiteSpace />
          <BussCard size={104} type="type1"/>
          <WhiteSpace />
        </div>
        {/* mask */}
        {
          this.state.open ? 
          <div className={`menu-mask ${this.state.open}`} onClick={this.onOpenChange}>
          </div>:null
        }


      </div >
    );
  }
}
export default BussListPage;

// export default Discovery;