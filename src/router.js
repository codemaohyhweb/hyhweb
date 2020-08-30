import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import('./pages/home.vue')
        },
        {
            path: "/forum",
            name: "forum",
            component: () => import('./pages/forum.vue')
        },
        
        {
            path: "/post/:id",
            name: "post",
            component: () => import('./pages/post.vue')
        },
        {
            path: "/blog",
            name: "blog",
            component: () => import('./pages/blog.vue')
        },
        {
            path: "/blogs/:id",
            name: "blogs",
            component: () => import('./pages/blogs.vue')
        },
        {
            path: "/post_err",
            name: "post_err",
            component: () => import('./pages/post_err.vue')
        },
    ]
})