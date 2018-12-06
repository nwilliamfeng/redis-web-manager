import { ApiHelper } from './apiHelper'

class RedisApi {

    /**
     * 获取配置
     */
    async getConfigs() {
        const json = await ApiHelper.get('/config/getlist');
        const { Data, Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Data.map(x => { return {id:x.name, name: x.Name, ip: x.IP, port: x.Port } });
    }


    /**
     * 连接
     * @param name 
     */
    async connect(name) {
        const json = await ApiHelper.get(`/redis/connect?name=${name}`);
        const { Data, Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        if(name==='conn2'){
            return Data.slice(0,3).map(x=>{return {id:`${name}-${x}`,dbIdx:x}});
        }
        return Data.map(x=>{return {id:`${name}-${x}`,dbIdx:x,connectionName:name}});
    }

    async getKeyTypes(name, dbindex = 0,dbId, key = '*', offset = 0) {
        const json = await ApiHelper.get(`/redis/getkeytypes?name=${name}&dbindex=${dbindex}&key=${key}&offset=${offset}`);
        const { Data, Message, Code } = json;
        //[{"Key":"9","Type":"string"}...]
        if (Code === 2)
            throw new Error(Message);
        return Data.map(x => { return {id:`${name}-${dbindex}-${x.Key}`, key: x.Key, type: x.Type,dbIdx:dbindex,dbId,connectionName:name} });
    }
}

export const redisApi = new RedisApi();