const routes = [
    {
      path: '/', 
      component: './index',
      routes:[
        { path: '/', component: './home/index' },
        { path: '/home', component: './home/index' },
        { path: '/discovery', component: './discovery/index' },
        { path: '/discovery/:id', component: './discovery/$id', Routes: ['src/pages/routes/PrivateRoute'],auth:true},
        { path: '/food', component: './home/food' },
        { path: '/list', component: './home/list' },
        { path: '/search', component: './home/search' },
        { path: '/searchList', component: './home/searchList' },

      ]
  },
  { path: '/login', component: './login' },
];
export default routes;
