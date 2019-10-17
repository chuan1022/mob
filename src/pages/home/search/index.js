
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import store from 'store';

// import router from 'u'
import { WhiteSpace,Icon} from 'antd-mobile';


import SearchCard from '@/components/searchCard';
import Loading from '@/components/loading';
import API from '@/services'
import './index.less';
import '@/styles/mixins.less';
const app = dva();

@connect(({ global,search }) => ({
  global,search
}))

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotList:[],
      historyList:[],
      keyword:"",
      isLoading:true
    }
    this.handleInputChang = this.handleInputChang.bind(this);
  }

  componentDidMount() {
    // this.getHistoryList();
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
    if(!this.state.keyword) return;
    this.setHistoryList(this.state.keyword)
    this.routerToNext(this.state.keyword)
  }
  getHotSearch(){
    let para={
      area_id:this.props.global.locationInfo.area_id,
      type:0  //0=通用,1=美食,2=其他
    }
    const {dispatch} = this.props;
    dispatch({
      type: 'search/getHotSearch',
      payload:para
    }).then(()=>{
      this.setState({
        isLoading:false
      })
    })
  }
  setHistoryList(str){
    const {dispatch} = this.props;
    dispatch({
      type: 'search/addHistory',
      payload:str
    })
  }
  clearHistoryList(){
    const {dispatch} = this.props;
    dispatch({
      type: 'search/clearHistory'
    })
  }
  getHistoryList(){
    const {dispatch} = this.props;
    dispatch({
      type: 'search/getHistory'
    })
  }
  handleTagClick(keyword){
    this.setHistoryList(keyword)
    this.routerToNext(keyword)
  }
  routerToNext(keyword){
    router.push({ 
      pathname: '/searchlist',
      query:{
        keyword:keyword
      }
    })
  }
  render() {
    const { hotSearchList,historySearchList } = this.props.search
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
            {
               this.state.isLoading?
               <Loading></Loading> :
               <ul className="tag-list">
                {
                  hotSearchList.map((item,index)=>(
                      <li 
                      onClick={this.handleTagClick.bind(this,item)} 
                      className="tag" key={index}>{item}</li>
                  ))
                }
              </ul>
            }
          </div>
          <div className="history-search-wrapper"> 
            <p className="font-size-15 text-color-333 font-bold flex justify-content-between align-items-center">
              < span>历史搜索</span>
              <span className="delet-btn" onClick={this.clearHistoryList.bind(this)}></span>
            </p>
            <ul className="tag-list">
              {
                historySearchList.length>0?
                historySearchList.map((item,index)=>(
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