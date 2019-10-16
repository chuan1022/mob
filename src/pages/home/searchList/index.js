
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Tabs,WhiteSpace ,Carousel,Accordion,List,Switch,Icon,StickyContainer, Sticky } from 'antd-mobile';
import Popup from "reactjs-popup";
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

class SearchListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType:'comm',  //comm 通用搜索  food 美食搜索
      tabs: [],
      handleOnFresh: false,
      activeType:0,
      open:false,
      page:1,
      pageSize:10,
      activePanel:'',
      showMask:false,
      keyword:'',
      params:{
        class_id:0,
        page:1,
        pageSize:10,
        lng:this.props.global.locationPoint.lng,
        lat:this.props.global.locationPoint.lat,
        // keyword:'',
        sort_by:'complex',// 排序方式:complex=综合排序,praise=好评优先,high_per_capita=人均最高,low_per_capita=人均最低,nearby=离我最近,sales_volume=销量
        new_store:0,  
        is_delivery:0,
        is_self_get:0,
        industry_id:0
      }, 
      typeList:[],  //行业列表
      regionList:[], //地区列表
      storeList:[],  //店铺列表
      bannerList:[defaultImg,defaultImg,defaultImg ],
      options : [
        { value: 'complex', label: '综合排序' },
        { value: 'nearby', label: '离我最近' },
        { value: 'praise', label: '好评优先' },
        { value: 'high_per_capita', label: '人均最高' },
        { value: 'low_per_capita', label: '人均最低' },
      ],
      activePop:'',
      filterText:'综合排序',
      filterTypes:[{
        title:'综合排序',
        value:'complex'
      },{
        title:'评分优先',
        value:'praise'
      },{
        title:'人均最高',
        value:'high_per_capita'
      },{
        title:'人均最低',
        value:'low_per_capita'
      },{
        title:'综合排序',
        value:'sales_volume'
      },{
        title:'综合排序',
        value:'nearby'
      }]
    }
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.query.keyword) {
      this.setState({
        keyword: location.query.keyword
      },()=>{
        this.setStoreListParams({
          keyword:this.state.keyword
        })
      });
    }
    this.getRegionList();
    this.getStoreType();
  }
  //行业类型
  getStoreType(){
    API.getStoreType().then(res=>{
      this.setState({
        typeList:res
      });
    })
  }
  //地区列表
  getRegionList(){
    API.getRegionList({
      area_id:this.props.global.locationInfo.area_id
    }).then(res=>{
      console.log(res);
      this.setState({
        regionList:res
      })
    })
  }
  //获取筛选列表
  getFilterList(){

  }
  componentDidUpdate(prevProps,prevState){
    if(this.state.activePop){
     
    }
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
      open:false,
      activePop:''
    })
  }

  handleCheckChange=(e)=>{
    if(e===undefined){
      this.hideMask();
    }else{
      this.showMask();
    }
  }
  handleCheckSureClick(){
    this.setState({
      activePop:'',
      showMask:false
    })
    this.getStoreList();
  }
  handleCheckResetClick(){
    this.setState({
      params:Object.assign({},this.state.params,{industry_id:0})
    })
  }
  setStoreListParams(options,getdata=true){
    let params = Object.assign(this.state.params,options)
    let filterText=this.state.filterTypes.find((el)=>{return el.value==params.sort_by}).title
    this.setState({
      params:params,
      showMask:false,
      activePop:'',
      filterText:filterText
    })
    if(getdata) this.getStoreList();
  }

  getStoreList(){
    console.log(this.state.params);
    //美食和其他接口不一样 根据路由切换
    API.getCommStoreList(this.state.params).then(res=>{
      console.log(res);
      this.setState({
        storeList:res||[]
      })
    })
  }
  handleMenuOpen(){
    console.log('open');
  }
  handleFilter(type){
    console.log(type);
    
    this.setState({
      activePop:type,
      showMask:true
    })
  }
  handleTagClick(id){
    // console.log(id);
    this.setState({
      params:Object.assign({},this.state.params,{industry_id:id})
    })
    // this.setStoreListParams({industry_id:id},false)

  }
  render() {

    return (
      <div className="page-searchlist bg-color-white  positon-relative" id="page-searchlist">
        <div className="fixed-header">
          <WhiteSpace/>
            <SearchCard 
              showAddress={false}
              showService={false}
              inputStyle={{
                backgroundColor:'#F4F4F4'
              }}
            ></SearchCard>
          <WhiteSpace/>
          {/* 筛选 */}
          <div className="filter-wrapper  padding-row-15 clearfix">
            <div className="pop-wrapper float-left ">
              <p
              onClick={this.handleFilter.bind(this,'sort')}
              className="font-size-15 text-color-666 pop-title active"
              >{this.state.filterText}</p>
              {this.state.activePop==="sort"?
                <div className="pop-content">
                <List className="my-list">
                  <List.Item onClick={this.setStoreListParams.bind(this,{sort_by:'complex'})}>
                    <span className="text-color-666 font-size-15 " >综合排序</span>
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
              </div>:null
              }
            </div>
            <div className="pop-wrapper float-left ">
              <p 
              
              onClick={this.handleFilter.bind(this,'area')}
              className={` float-left font-size-15 text-color-666 pop-title`}>全城</p>
              {this.state.activePop==="area"?
                <div className="pop-content">
                <List className="my-list">
                  {
                    this.state.regionList.map((item,index)=>
                    <List.Item 
                    key={item.id}
                    onClick={this.setStoreListParams.bind(this,{region_id:item.id})}>
                      <span className="text-color-666 font-size-15" >
                        {item.name}
                      </span>
                    </List.Item>
                  )
                  }
                </List>
              </div>:null
              }
          
            </div>
            <div className="pop-wrapper float-left">
              <p
              onClick={this.setStoreListParams.bind(this,{
                is_self_get:this.state.params.is_self_get?0:1
              })}
              className={`${this.state.params.is_self_get?'active':''} font-size-15 text-color-666 pop-title`}>到店用</p>
            </div>
            <div className="pop-wrapper float-left ">
              <p 
              onClick={this.setStoreListParams.bind(this,{
                is_delivery:this.state.params.is_delivery?0:1
              })}
              className={`${this.state.params.is_delivery?'active':''} font-size-15 text-color-666 pop-title`}>配送</p>
            </div>
            <div className="pop-wrapper float-right">
              <p 
              onClick={this.handleFilter.bind(this,'filter')}
              className="font-size-15 text-color-666 pop-title">筛选</p>
              {this.state.activePop==="filter"?
              <div className="pop-content padding-row-15">
                <ul className="tag-list">
                  {
                    this.state.typeList.map((item,index)=>
                    <li 
                    onClick={this.handleTagClick.bind(this,item.id)}
                    key={item.id} 
                    className={`tag ${this.state.params.industry_id===item.id?'active':''}`}>{item.name}</li>
                    )
                    }
                  
                </ul>
                <div className="panel-btns flex text-align-center">
                  <div 
                  onClick={this.handleCheckResetClick.bind(this)} 
                  className="flex-1 panel-btn default">重置</div>
                  <div
                  onClick={this.handleCheckSureClick.bind(this)}
                  className="flex-1 panel-btn theme">确定</div>
                </div>
              </div>:null
            }
              
            </div>
          </div>
          
        </div>
     
        {/* 列表 */}
        <div className="store-list-wrapper padding-row-15">
          {this.state.storeList.length>0?
            this.state.storeList.map((item,index)=>(
              <div key={item.id}>
                <BussCard
                  storeInfo={{
                    avatarUrl:item.image,
                    name: item.title,
                    stars: item.evaluation,
                    cost: item.per_capita,
                    address: item.address,
                    love_number:100,
                    distance:item.distance,
                    delivery:item.is_delivery,
                    selfGet:item.is_self_get,
                    isRest:item.is_rest,
                    goodsList:item.goods,
                    rest:1
                  }}

                  size={75}
                  showAvatar={true}
                  showRight={false}
                  showCost2={false}
                  showTags={false}
                  showDistance={false}
                  wrapperStyle={{
                    borderBottom:'1px solid #ECEBEB',
                    borderRadius: 'unset',
                  }}/>
              </div>
             
            )):null}
        </div>

        {/* mask */}
        {
          this.state.showMask ? 
          <div className={`menu-mask ${this.state.open}`} 
          onClick={this.hideMask.bind(this)}>
          </div>:null
        }


      </div >
    );
  }
}
export default SearchListPage;

// export default Discovery;