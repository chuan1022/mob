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
        '/find/api': {
          target: 'http://dev.gateway.360vrsh.com',
          changeOrigin: true
        }
    },
    routes: routes,
    alias: {
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components')
    }
};