import Mock from 'mockjs'
import homeApi from './mockServeDate/home'
import user from './mockServeDate/user'
import permission  from './mockServeDate/permission'
//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi)
//用户数据列表
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)