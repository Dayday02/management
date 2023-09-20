export default {
    state:{
        isCollapse:false,
        tabsList:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              }
        ]//面包屑
    },
    mutations:{
         collapseMenu(state){
            state.isCollapse=!state.isCollapse
         },
         //更新面包屑
         selectMenu(state,val){
           console.log(val);
           if(val.name !== 'home'){
              var index= state.tabsList.findIndex(item =>item.name===val.name) 
              console.log(index);
               if(index === -1){
                state.tabsList.push(val)
               }     
               
           }
        
          
         }
    }
    
}