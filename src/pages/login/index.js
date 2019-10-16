
import React, { Component } from 'react';
import dva, {connect} from 'dva';

import './index.less';
import '@/styles/mixins.less';
const app = dva();

@connect(({ global }) => ({
  global
}))

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <h1>
          请登录！
        </h1>
      </div>
      );
  }
}
export default Login;