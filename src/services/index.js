import commonAPI from './common';
import scenterAPI from './scenter';
import discoveryAPI from './discovery';
import fcAPI from './fc';

const API = Object.assign({},commonAPI,scenterAPI,discoveryAPI,fcAPI);

export default API;