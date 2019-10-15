
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import store from 'store';

// import router from 'u'
import { WhiteSpace,Icon} from 'antd-mobile';


import SearchCard from '@/components/searchCard';

import API from '@/services'
import './index.less';
import '@/styles/mixins.less';
const app = dva();

@connect(({ global }) => ({
  global
}))

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotList:[],
      historyList:[],
      keyword:""
    }
    this.handleInputChang = this.handleInputChang.bind(this);
  }

  componentDidMount() {
    this.getHistoryList();
    this.getHotSearch();
  }
  componentDidUpdate(prevProps,prevState){
    
  }
  handleInputChang(e){
    this.setState({
      keyword:e.target.value
    })
  }
  handleSearchClick(){
    this.setHistoryList(this.state.keyword)
    this.routerToNext(this.state.keyword)
  }
  getHotSearch(){
    console.log(this.state.params);
    let params={
      area_id:this.props.global.locationInfo.area_id,
      type:0  //0=通用,1=美食,2=其他
    }
    API.getHotSearch(params).then(res=>{
      console.log(res);
      this.setState({
        hotList:res
      })
    })
  }
  setHistoryList(str){
    let list=store.get('historyList')||[];
    list.unshift(str);
    store.set('historyList',list);
    this.getHistoryList();
  }
  clearHistoryList(){
    store.set('historyList',[]);
    this.getHistoryList();
  }
  getHistoryList(){
    this.setState({
      historyList:store.get('historyList')||[]
    })
  }
  handleTagClick(keyword){
    this.setHistoryList(keyword)
    this.routerToNext(keyword)
  }
  routerToNext(keyword){
    console.log('搜索'+keyword);
    router.push({ 
      pathname: '/searchlist',
      query:{
        keyword:keyword
      }
    })
  }
  render() {
    return (
      <div className="page-search positon-relative bg-color-white" id="page-search">
        <div className="padding-row-15">
          <WhiteSpace/>
          <div className="search-wrapper flex align-items-center">
            <input 
            onChange={this.handleInputChang}
            value={this.state.keyword} 
            type="text" 
            className="search-input flex-1"/>
            <span 
            onClick={this.handleSearchClick.bind(this)}
            className="text-color-333 font-size-15 padding-left-10">搜索</span>
          </div>
          <div className="hot-search-wrapper">
            <p className="font-size-15 text-color-333 font-bold">热门搜索</p>
            <ul className="tag-list">
              {
                this.state.hotList.map((item,index)=>(
                    <li 
                    onClick={this.handleTagClick.bind(this,item)} 
                    className="tag" key={index}>{item}</li>
                ))
              }
            </ul>
          </div>
          <div className="history-search-wrapper"> 
            <p className="font-size-15 text-color-333 font-bold flex justify-content-between align-items-center">
              < span>历史搜索</span>
              <span className="delet-btn" onClick={this.clearHistoryList.bind(this)}></span>
            </p>
            <ul className="tag-list">
              {
                this.state.historyList.length>0?
                this.state.historyList.map((item,index)=>(
                    <li  
                    onClick={this.handleTagClick.bind(this,item)}
                    className="tag" key={index}>{item}</li>
                ))
                :null
              }
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
export default SearchPage;

// export default Discovery;