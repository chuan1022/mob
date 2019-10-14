
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Tabs,WhiteSpace ,Carousel,Accordion,List,Switch,Icon,StickyContainer, Sticky } from 'antd-mobile';
import Masonry from 'react-masonry-component';
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

class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      storeList: [],
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
      newStoreChecked:0,
      deliveryChecked:0,
      activePanel:'',
      showMask:false,
      params:{
        class_id:0,
        page:1,
        pageSize:10,
        // keyword:'',
        sort_by:'complex',// 排序方式:complex=综合排序,praise=好评优先,high_per_capita=人均最高,low_per_capita=人均最低,nearby=离我最近,sales_volume=销量
        new_store:0,  
        is_delivery:0,
        lng:this.props.global.locationPoint.lng,
        lat:this.props.global.locationPoint.lat,
        // is_self_get:false
      }, 
      storeList:[],  //店铺列表
      bannerList:[defaultImg,defaultImg,defaultImg ]
    }
    this.handelTabClick = this.handelTabClick.bind(this);
    this.handleFirNavClick = this.handleFirNavClick.bind(this);
    this.handleSecNavClick = this.handleSecNavClick.bind(this);
    this.getStoreClassList = this.getStoreClassList.bind(this);
    this.setStoreListParams = this.setStoreListParams.bind(this);
  }

  componentDidMount() {
    this.getStoreClassList();
  }
  componentDidUpdate(prevProps,prevState){
    
  }
  toggleMask(el){
    console.log(el);
    
    this.setState({
      showMask:!this.state.showMask
    })
  }
  showMask(){
    this.setState({
      showMask:true
    })
  }
  hideMask(){
    this.setState({
      showMask:false,
      open:false
    })

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
      area_id:this.props.global.addressID
    }

    API.getStoreClassList(params).then(res=>{
      console.log(res);
      this.getTabscList(res.recommend)
      this.setState({
        navData:res.list,
        // secId:res.recommend[0].id
      });
      this.setStoreListParams({
        class_id:res.recommend[0].id
      })
    })
  }
  handelTabClick(tab,index){
    this.setState({
      secClassId:tab.id
    })
    console.log(tab)
    this.setStoreListParams({
      class_id:tab.id
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
    this.setState({ open: !this.state.open });
    this.toggleMask();
  }
  handleCheckChange=(e)=>{
    if(e===undefined){
      this.hideMask();
    }else{
      this.showMask();
    }
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
    //切换显示的二级分类
    this.getTabscList(this.state.navData[firIndex].children);
    //更新params,并请求新数据
    this.setStoreListParams({
      class_id:secId
    });
    //关闭
    this.setState({
      open:false,
      showMask:false
    })
  }
  setStoreListParams(options,getdata=true){
    let params = Object.assign(this.state.params,options)
    this.setState({
      params:params
    })

    if(getdata) this.getStoreList();
  }
  handleCheckSureClick(){
    this.setStoreListParams({
      new_store:this.state.newStoreChecked,
      is_delivery:this.state.deliveryChecked
    })
  }
  handleCheckCancleClick(){
    this.setState({
      newStoreChecked:0,
      deliveryChecked:0,
      activePanel:''
    },()=>{
      this.setStoreListParams({
        new_store:this.state.newStoreChecked,
        is_delivery:this.state.deliveryChecked
      })
    })

 
  }
  getStoreList(){
    console.log(this.state.params);
    
    API.getStoreList(this.state.params).then(res=>{
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
                renderTabBar={props => 
                <Tabs.DefaultTabBar {...props
                } 
                renderTab={tab=>
                  <div className={`${this.state.secClassId===tab.id?'active':''} tab-item`}>{tab.title}</div>
                } />}
                onTabClick={(tab,index)=>this.handelTabClick(tab,index)}
              >
              </Tabs>
            
              <div 
              onClick={this.onOpenChange}
              className="down-button text-color-fff bg-color-theme flex align-items-center justify-content-center">
                <Icon className={`${this.state.open?'open':''} down-icon`} type="down" />
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
        <div className="padding-row-15 padding-column-15 bg-color-white">
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
        bg-color-white line-height-l  pick-wrapper position-relative margin-bottom-15" >
              <Accordion 
              onChange={this.handleCheckChange}
              accordion={true} 
              defaultActiveKey={this.state.activePanel} 
              className="my-accordion" >
                <Accordion.Panel
                
                header={
                <span  className="font-size-15 font-blod text-color-666">综合排序</span> 
                }>
                  <List className="my-list">
                    <List.Item onClick={this.setStoreListParams.bind(this,{sort_by:'complex'})}>
                      <span className="text-color-666 font-size-15" >综合排序</span>
                    </List.Item>

                    <List.Item onClick={this.setStoreListParams.bind(this,{sort_by:'praise'})}>
                      <span  className="text-color-666 font-size-15">评分优先</span>
                    </List.Item>

                    <List.Item onClick={this.setStoreListParams.bind(this,{sort_by:'high_per_capita'})}>
                      <span  className="text-color-666 font-size-15">人均最高</span>
                    </List.Item>

                    <List.Item onClick={this.setStoreListParams.bind(this,{sort_by:'low_per_capita'})}>
                      <span  className="text-color-666 font-size-15">人均最低</span>
                    </List.Item>

                  </List>
                </Accordion.Panel>
                <p 
                  onClick={this.setStoreListParams.bind(this,{sort_by:'nearby'})}
                  className={`${'active'} item font-size-15 text-color-666`}>距离</p>
                  <p 
                  onClick={this.setStoreListParams.bind(this,{sort_by:'sales_volume'})}
                  className={`${'active'} item font-size-15 text-color-666`}>销量</p>
                <Accordion.Panel
                  header={
                  <span className="font-size-15 text-color-666">筛选</span> 
                  }>
                  <List className="my-list">
                    <List.Item 
                      className="text-color-666 font-size-15"
                      extra={<Switch
                      checked={this.state.newStoreChecked}
                      color='#ED6C2D'
                      onChange={() => {

                          this.setState({
                            newStoreChecked: !this.state.newStoreChecked?1:0,
                          },()=>{
                            this.setStoreListParams({
                              new_store:this.state.newStoreChecked
                            },false)
                          });
                        }}
                      />}>
                      <span className="text-color-666 font-size-15">新店开业</span>
                    </List.Item>
                    <List.Item 
                      className="text-color-666 font-size-15"
                      extra={<Switch
                      checked={this.state.deliveryChecked}
                      color='#ED6C2D'
                      onChange={() => {
                          this.setState({
                            deliveryChecked: !this.state.deliveryChecked?1:0,
                          },()=>{
                            this.setStoreListParams({
                              is_delivery:this.state.deliveryChecked
                            },false)
                          });
                        }}
                      />}>
                      <span  className="text-color-666 font-size-15">可配送</span>
                    </List.Item>
                  </List>
                  <div className="panel-btns flex text-align-center">
                    <div 
                    onClick={this.handleCheckCancleClick.bind(this)} 
                    className="flex-1 panel-btn default">清空</div>
                    <div
                    onClick={this.handleCheckSureClick.bind(this)}
                    className="flex-1 panel-btn theme">确定</div>
                  </div>
                </Accordion.Panel>
              
              </Accordion>
            
        </div>


        {/* 列表 */}
        <div className="store-list-wrapper padding-row-15">
          {
            this.state.storeList.length>0?
            this.state.storeList.map((item,index)=>(
              <BussCard 
              name={item.title}
              stars={item.evaluation}
              distance={item.distance}
              avatarUrl={item.image}
              cost={item.per_capita}
              rest={item.is_rest}
              delivery={item.is_delivery}
              selfGet={item.is_self_get}
              size={104} type="type1"/>
            )):null
          }
        </div>
        {/* mask */}
        {
          this.state.showMask ? 
          <div className={`menu-mask ${this.state.open}`} onClick={this.hideMask.bind(this)}>
          </div>:null
        }
      </div >
    );
  }
}
export default FoodList;
