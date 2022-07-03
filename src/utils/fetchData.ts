import axios from "axios";

function wrapPromise(promise: Promise<any>){
    // 设定两个变量，一个指示当前状态，一个指示最后的结果
    let status = 'pending'
    let result:any
    let suspender = promise.then((r)=>{
        status = 'success'
        result = r
    },(e)=>{
        status = 'error'
        result = e
    })
    return {
        read(){
            if(status === 'pending'){
                throw suspender
            }else if(status === 'error'){
                throw result
            }else if(status === 'success'){
                return result
            }
        }
    }
}


export default function fetchData(url:string){
    const promise = axios.get(url).then((rawData) => rawData.data)
    return wrapPromise(promise)
}
