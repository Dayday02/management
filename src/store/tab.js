import Cookies from "js-cookie";
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],//面包屑
        Menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state, val) {
            console.log(val);
            if (val.name !== 'home') {
                var index = state.tabsList.findIndex(item => item.name === val.name)
                console.log(index);
                if (index === -1) {
                    state.tabsList.push(val)
                }

            }


        },
        //用户menu数据
        setMenu(state, val) {
            state.Menu = val
            Cookies.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            if (!Cookies.get('menu')) return
            const menu = JSON.parse(Cookies.get('menu'))
            state.Menu = menu
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }
                else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }

}