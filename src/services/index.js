import commonAPI from './common';
import scenterAPI from './scenter';
import discoveryAPI from './discovery'

const API = Object.assign({},commonAPI,scenterAPI,discoveryAPI);

export default API;