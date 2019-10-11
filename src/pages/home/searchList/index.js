
import React, { Component } from 'react';
import dva, {connect} from 'dva';
import Link from 'umi/link';
import store from 'store';
import { WhiteSpace,Icon} from 'antd-mobile';


import SearchCard from '@/components/searchCard';


import defaultImg from './无商品.png';
import API from '@/services'
import './index.less';
import '@/styles/mixins.less';
const app = dva();

@connect(({ global }) => ({
  global
}))

class SearchListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword:''
    }

  }

  componentDidMount() {
    const { location } = this.props;
    if (location.query.keyword) {
      this.setState({
        keyword: location.query.keyword
      });
    }
  }
  componentDidUpdate(prevProps,prevState){
    
  }
  
  render() {
    return (
      <div className="page-searchlist positon-relative bg-color-white" id="page-searchlist">
        <p>searchlist</p>
      </div >
    );
  }
}
export default SearchListPage;

// export default Discovery;