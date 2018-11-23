import {ApiHelper} from './apiHelper'

 class RedisApi {

    /**
     * 获取配置
     */
     async getConfigs(){ 
        const json = await ApiHelper.get('/config/getlist');
        const { Data, Message,Code } = json;
        if (Code===2)
            throw new Error(Message);       
        return Data.map(x =>{return { name:x.Name, ip:x.IP, port:x.Port }});
    }


    /**
     * 连接
     * @param name 
     */
     async connect(name) {
        const json = await ApiHelper.post('/config/connect',name);
        const { Data, Message,Code } = json;
        if (Code===2)
            throw new Error(Message);
        return Data;
    }
}

export const redisApi =new RedisApi();