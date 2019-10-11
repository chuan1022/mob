
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

class BussListPage extends Component {
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
        lng:this.props.global.locationInfo.lng,
        lat:this.props.global.locationInfo.lat,
        // keyword:'',
        sort_by:'complex',// 排序方式:complex=综合排序,praise=好评优先,high_per_capita=人均最高,low_per_capita=人均最低,nearby=离我最近,sales_volume=销量
        new_store:0,  
        is_delivery:0,
        // is_self_get:false
      }, 
      storeList:[],  //店铺列表
      bannerList:[defaultImg,defaultImg,defaultImg ]
    }
  }

  componentDidMount() {
    this.getStoreList();
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

  handleCheckChange=(e)=>{
    if(e===undefined){
      this.hideMask();
    }else{
      this.showMask();
    }
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
  setStoreListParams(options,getdata=true){
    let params = Object.assign(this.state.params,options)
    this.setState({
      params:params
    })

    if(getdata) this.getStoreList();
  }

  getStoreList(){
    console.log(this.state.params);
    
    API.getCommStoreList(this.state.params).then(res=>{
      console.log(res);
      this.setState({
        storeList:res
      })
    })

  }
  render() {
    return (
      <div className="page-searchlist page-bg positon-relative" id="page-searchlist">
        {/* 列表 */}
        <div className="store-list-wrapper padding-row-15">
          {
            this.state.storeList.map((item,index)=>(


        //       size:75,
//         distance: "911m"
// evaluation: "0.0"
// id: 1
// image: ""
// is_delivery: 1
// is_rest: 0
// is_self_get: 1
// per_capita: "6.80"
// sales: 0
// title: "迪摩信息有限公司"
        // avatarUrl:defaultImg,
        // name: '杭州小笼包黄焖鸡米饭',
        // stars: 4,
        // cost: 66,
        // address: '郑东新区东建材',
        // love_number:100,
        // distance:500,
        // tag:['支持配送','到店自取','免费配料','急速配送'],
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
            ))}
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
export default BussListPage;

// export default Discovery;