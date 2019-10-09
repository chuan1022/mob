import path from 'path';
import routes from './router.config';

export default {
    treeShaking: true,
    plugins: [
        ['umi-plugin-react', {
            dva: true,
            antd: false,
            dynamicImport: false,
            title: '智慧城市',
            dll: true
        }],
    ],
    proxy: {
        '/find': {
          target: 'http://dev.gateway.360vrsh.com/find/api',
          changeOrigin: true,
          pathRewrite: {
            '^/find':''
          }
        },
        '/cmm': {
          target: 'http://dev.gateway.360vrsh.com/cmm/api',
          changeOrigin: true,
          pathRewrite: {
            '^/cmm':''
          }
        },
        '/scenter': {
          target: 'http://dev.gateway.360vrsh.com/scenter/api',
          changeOrigin: true,
          pathRewrite: {
            '^/scenter':''
          }
        },
    },
    routes: routes,
    alias: {
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components')
    },
    externals:{
      'BMap':'BMap',
    }
};