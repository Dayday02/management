import http from '@/utills/request'

export const getData=()=>{
    return http.get('/home/getData')
}
