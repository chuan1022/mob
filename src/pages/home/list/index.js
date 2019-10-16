
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import store from 'store'

import { Carousel, WhiteSpace,Flex} from 'antd-mobile';
import Masonry from 'react-masonry-component';

import SearchCard from '@/components/searchCard';
import Star from '@/components/star';
import './index.less';
import '@/styles/mixins.less';

import defaultImg from './6.jpg';
import API from '@/services'
const app = dva();


const masonryOptions = {
  // columnWidth: 150,
  transitionDuration: 0,
  gutter: 0
}

@connect(({ global }) => ({
  global
}))

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleOnFresh: false,
      bannerList:[defaultImg,defaultImg,defaultImg ],
      storeList:new Array(20).fill(''),
      page:1,
      pageSize:10,
    }

  }

  componentDidMount() {
    // this.getCommStoreList();
    const { location } = this.props;
    if (location.query.industry_id) {
      this.setState({
        industry_id: location.query.industry_id
      },()=>{
        this.getCommStoreList()
      });
    }

  }
  componentDidUpdate(prevProps,prevState){
   
  }
  //获取banner
  getTopBanner(){

  }

  //获取商家列表
  getCommStoreList(){
    let para ={
      lat:this.props.global.locationPoint.lat,
      lng:this.props.global.locationPoint.lng,
      industry_id:this.state.industry_id,
      page:this.state.page,
      pageSize:this.state.pageSize
    }
    console.log(para);
    
    API.getOtherStoreList(para).then(res=>{
      console.log(res);
      this.setState({
        storeList:res
      })
    })
  }

  render() {

  
    
    return (
      <div className="page-home page-bg full-wrapper" id="page-home">
        <div className="main-wrapper">
          {/* search */}
          <div className="top-header">
            <SearchCard 
            showAvatar={true}
            showService={false}
            showAddress={false}
            address={this.props.global.locationInfo&&this.props.global.locationInfo.city_name}>
            </SearchCard>
          </div>
        
          <div className="content-wrapper padding-row-15">
            {/* banner */}
            <div className="slide-wrapper">
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
                      height: '90px',
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

            <div className="stores-wrapper">
              <Flex wrap="wrap">
              {
                this.state.storeList ?
                  this.state.storeList.map(
                  (item, index) =>
                    <div
                    className={`${index%2?'even':'odd'} item`}
                    key={item.id}>
                      <Link className="link" to="/">
                        <div className="item-img">
                            <img src={item.image} alt=""/>
                        </div>
                        <div className="item-content">
                          <p className="ellipsis item-title text-color-333 font-size-15 font-bold">{item.title}</p>
                          <div className="item-info"> 
                            <Star num={Math.round(item.evaluation)}></Star>
                            <span 
                            className="font-size-11 text-color-666 margin-left-10">人均 {Math.floor(item.per_capita)} 元</span>
                          </div>
                          <p className="ellipsis font-size-11 text-color-666 item-address">
                            {item.address}
                          </p>
                        </div>
                      </Link>
                    </div>) 
                    : null
                }
              </Flex>
             
           
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default List;
