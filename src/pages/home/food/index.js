
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';

import { Tabs,WhiteSpace ,Carousel,Accordion,List,Switch,Icon,StickyContainer, Sticky } from 'antd-mobile';

import SearchCard from '@/components/searchCard';
import BussCard from '@/components/bussCard';
import Loading from '@/components/loading';

import defaultImg from './无商品.png';

import './index.less';

const app = dva();

const masonryOptions = {
  // columnWidth: 150,
  transitionDuration: 0,
  gutter: 0
}

@connect(({ global,food }) => ({
  global,food
}))

class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleOnFresh: false,
      activeType:0,
      open:false,
      activeFirList:0,
      activeSecList:0,
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
      bannerList:[defaultImg,defaultImg,defaultImg ],
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
      }],
      activePop:''
    }
  }

  componentDidMount() {
    this.getStoreClassList();
  }
  componentDidUpdate(prevProps,prevState){
    
  }
  toggleMask(el){
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

  getStoreClassList(){
    const {dispatch} = this.props;

    let params={
      type:'food',
      area_id:this.props.global.locationInfo.area_id
    }

    dispatch({
      type: 'food/getStoreClassList',
      payload:params
    }).then(()=>{
      this.setStoreListParams({
        class_id:this.props.food.tabs[0].id
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
    const {dispatch,food} = this.props;

    //切换分类
    this.setState({
      activeSecList:secIndex,
      firClassId:firId,
      secClassId:secId
    })
    //切换显示的二级分类
    dispatch({
      type: 'food/handleChangeTabList',
      payload:food.navData[firIndex].children
    })

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
    let filterText=this.state.filterTypes.find((el)=>{return el.value==params.sort_by}).title
    this.setState({
      params:params,   
      filterText:filterText
    })

    if(getdata){
      this.setState({
        showMask:false,
        activePop:'',
      })
      this.getStoreList();
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
  getStoreList(){
    console.log(this.state.params);
    // let params={
    //   lat: 34.75661006,
    //   lng: 113.64964385,
    //   class_id:1
    // }
    // API.getStoreList(this.state.params).then(res=>{
    //   console.log(res);
    //   this.setState({
    //     storeList:res
    //   })
    // })
    const {dispatch} = this.props;

    dispatch({
      type: 'food/getStoreList',
      payload:this.state.params
    })

  }
  handleFilter(type){
    console.log(type);
    
    this.setState({
      activePop:type,
      showMask:true
    })
  }
  render() {
    const {tabs,navData,storeList,isLoading} = this.props.food
    return (
      <div className="page-food page-bg positon-relative" id="page-food">

        {/* 顶部导航 */}
        <div className="border-box top-wrapper ">
          {/* 顶部 */}
          <div style={{
            zIndex:2
          }} className="position-relative bg-color-theme ">
            <WhiteSpace/>
            <SearchCard 
              showAddress={false}
              showService={false}
            >
              </SearchCard>
            <WhiteSpace size="lg"/>
            {/* tab */}
            <div className="list-tab vr-tabs position-relative padding-row-15 ">
              <Tabs
                page={2}
                tabBarBackgroundColor='#ED6C2D'
                tabBarTextStyle={{
                  'fontSize': '15px',
                  'color': '#fff'
                }}
                tabBarUnderlineStyle={{
                  'display': 'none'
                }}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                tabs={tabs}
                renderTab={tab=>
                  <div className={`${this.state.secClassId===tab.id?'active':''} tab-item`}>{tab.title}</div>
                }
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
                  {navData.map((el,index)=>
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
                  {navData.map((el,index)=>
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

            <div className="pop-wrapper float-left">
              <p
              onClick={this.setStoreListParams.bind(this,{
                sort_by:this.state.params.sort_by==='nearby'?'complex':'nearby'
              })}
              className={`${this.state.params.sort_by==='nearby'?'active':''} font-size-15 text-color-666 pop-title`}>距离</p>
            </div>

            <div className="pop-wrapper float-left ">
              <p 
              onClick={this.setStoreListParams.bind(this,{
                sort_by:this.state.params.sort_by==='sales_volume'?'complex':'sales_volume'
              })}
              className={`${this.state.params.sort_by==='sales_volume'?'active':''}   font-size-15 text-color-666 pop-title`}>销量</p>
            </div>
            <div className="pop-wrapper float-right">
              <p 
              onClick={this.handleFilter.bind(this,'filter')}
              className="font-size-15 text-color-666 pop-title">筛选</p>
              {this.state.activePop==="filter"?
              <div className="pop-content padding-row-15">
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
                  className="flex-1 panel-btn default">重置</div>
                  <div
                  onClick={this.handleCheckSureClick.bind(this)}
                  className="flex-1 panel-btn theme">确定</div>
                </div>
              </div>:null
            }
              
            </div>
          </div>

        {/* 列表 */}
        <div className="store-list-wrapper padding-row-15">
          {
            isLoading ? <Loading></Loading>:
            storeList.map((item,index)=>(
              <BussCard
                key={item.id}
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
                  goodsList:item.goods
                }}

                size={75}
                showAvatar={true}
                showRight={false}
                showCost1={false}
                showAddress={false}
                wrapperStyle={{
                  margin:"10px 0"
                }}/>
            ))
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
