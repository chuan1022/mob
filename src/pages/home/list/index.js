
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Sticky,Tabs, PullToRefresh,WhiteSpace ,Drawer} from 'antd-mobile';
import Masonry from 'react-masonry-component';
import dataList from './dadta';
import DiscItem from '@/components/discoveryItem'
import SearchCard from '@/components/searchCard'
import defaultImg from './6.jpg';


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

@connect(({ count }) => ({
  count
}))

class BussList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      dataList: [],
      handleOnFresh: false,
      activeType:0,
      open:true,
      activeFirList:0,
      activeSecList:0,
      navData:[
        {
          lable:'美食1',
          number:100,
          children:[{
            lable:'美食1-1',
            number:10,
            imgUrl:defaultImg
          },{
            lable:'美食1-1',
            number:10,
            imgUrl:defaultImg
            
          },{
            lable:'美食1-1',
            number:10,
            imgUrl:defaultImg
          },{
            lable:'美食1-1',
            number:10,
            imgUrl:defaultImg
          }]
        },{
          lable:'美食2',
          number:100,
          children:[{
            lable:'美食2-1',
            number:10,
            imgUrl:defaultImg
          },{
            lable:'美食2-1',
            number:10,
            imgUrl:defaultImg
          },{
            lable:'美食2-1',
            number:10,
            imgUrl:defaultImg
          },{
            lable:'美食2-1',
            number:10,
            imgUrl:defaultImg
          },{
            lable:'美食2-1',
            number:10,
            imgUrl:defaultImg
          }]
        }
      ]
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
  getRecList(data){
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
      this.getRecList(res.recommend)
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
  handleSecNavClick(index){
    console.log(index);
    
    this.setState({
      activeSecList:index
    })
  }
  render() {
    return (
      <div className="page-list page-bg positon-relative" id="page-list">

        {/* 顶部 */}
        <div className="border-box top-wrapper padding-bottom-5">
          <div className="bg-color-theme padding-left-15 padding-right-15 ">
          <WhiteSpace/>
          <SearchCard 
            showAddress={false}
            showService={false}
          >
            </SearchCard>
          <WhiteSpace size="lg"/>
          {/* tab */}
          <div className="list-tab vr-tabs position-relative">
            <Tabs
              tabBarBackgroundColor='#ED6C2D'
              tabBarTextStyle={{
                'fontSize': '15px',
                'color': '#fff',
                width:'auto'
              }}
              tabBarUnderlineStyle={{
                'border': '1px solid #ED6C2D',
                'width': '20px',
                'display': 'none'
              }}
              tabs={this.state.tabs}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
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
         {
          this.state.open? 
            <div className="downpanal-nav bg-color-white flex">
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
                          onClick={this.handleSecNavClick.bind(this,i)}
                          key={i} className={`${this.state.activeSecList===i?'active':''}  item flex align-items-center justify-content-between`}>
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
            :null
         }
         
        </div>
        
        {/* mask */}
        {
          this.state.open ? <div className="menu-mask" onClick={this.onOpenChange} /> : null
        }
       

      </div >
    );
  }
}
export default BussList;

// export default Discovery;