
module.exports = {
    devServer: {
        host: "0.0.0.0", //指定使用一个 host。默认是 localhost，这里默认值即可
        port: 8080, //指定端口
        hot: true, // 开启热更新
        https: false, // 是否开启https模式
        proxy: { // 请求代理服务器
            '/codemaoapi': { //带上api前缀的
                target: 'http://localhost:3000/codemaoapi/', //代理目标地址
                //target: 'https://api.codemao.cn/', //代理目标地址
                changeOrigin: true,
                pathRewrite: { // 在发出请求后将/api替换为''空值，这样不影响接口请求
                    '^/codemaoapi': ''
                },
                // onProxyReq: proxyReq => {
                //     // 接口设置了域名限制，所以要改掉origin来符合后端的域名限制的判断
                //     const cookies = proxyReq.getHeader('cookie');
                //     if (proxyReq.getHeader('origin')) {
                //         proxyReq.setHeader('origin', 'https://shequ.codemao.cn');
                //     }
                //     if (proxyReq.getHeader('referer')) {
                //       proxyReq.setHeader('referer', 'https://shequ.codemao.cn/community');
                //     }
                //     if (cookies) {
                //       const cookieKey = 'auth';
                //       const cookie = cookies.replace(cookieKey, 'authorization');
                //       proxyReq.setHeader('cookie', cookie);
                //     }
                // }
            },
            '/api': { //带上api前缀的
                target: 'http://localhost:3000/api/', //代理目标地址
                changeOrigin: true,
                pathRewrite: { // 在发出请求后将/api替换为''空值，这样不影响接口请求
                    '^/api': ''
                }
            }
        },
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}