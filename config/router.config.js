const routes = [
    { path: '/', component: './home/index' },
    { path: '/home', component: './home/index' },
    { path: '/discovery', component: './discovery/index' },
    { path: '/discovery/:id', component: './discovery/$id' },
    { path: '/list', component: './home/list' }

];
export default routes;
