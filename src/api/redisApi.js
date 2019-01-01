import { ApiHelper } from './apiHelper'
import {connectionStates,dbStates} from '../constants'

class RedisApi {

    /**
     * 获取配置
     */
    async getConfigs() {
        const json = await ApiHelper.get('/config/getlist');
        const { Data, Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Data.map(x => { return { id: x.Name, name: x.Name, ip: x.IP, port: x.Port, connectionState:connectionStates.NONE} });
    }


    /**
     * 删除连接
     * @param {*} connectionName 
     */
    async deleteConnection(connectionName) {
        const json = await ApiHelper.get(`/config/rem?name=${connectionName}`);
        const { Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
    }

    async getStringKeyValue(connectionName,dbIdx,key){
        const json = await ApiHelper.get(`/redis/get?name=${connectionName}&dbindex=${dbIdx}&key=${key}`);
        const { Message, Code ,Data} = json;
        if (Code === 2)
            throw new Error(Message);
        return Data;
    }

    /**
     * 删除键
     */
    async deleteKey(key,connectionName,dbIdx) {
        const json = await ApiHelper.get(`/redis/del?name=${connectionName}&dbindex=${dbIdx}&key=${key}`);
        const {  Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Code===1;
    }

     /**
     * 添加键
     */
    async appendKey(type,id,key,value,connectionName,dbIdx) {
        const url =`/redis/set?Name=${connectionName}&DBIndex=${dbIdx}&Id=${id}&Type=${type}&Value=${value}`;     
        const json = await ApiHelper.get(key==null? url: url+`&Key=${key}`);
        const {  Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Code===1;
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
        if (name === 'conn2') {
            return Data.slice(0, 3).map(x => { return { id: `${name}-${x}`, dbIdx: x, connectionName: name ,dbState:dbStates.NONE} });
        }
        return Data.map(x => { return { id: `${name}-${x}`, dbIdx: x, connectionName: name,dbState:dbStates.NONE, } });
    }

    async getKeyTypes(name, dbindex = 0, dbId, key = '*', offset = 0) {
        const json = await ApiHelper.get(`/redis/getkeytypes?name=${name}&dbindex=${dbindex}&key=${key}&offset=${offset}`);
        const { Data, Message, Code } = json;
        //[{"Key":"9","Type":"string"}...]
        if (Code === 2)
            throw new Error(Message);
        return Data.map(x => {
            return {
                id: `${name}-${dbindex}-${x.Key}`,
                key: x.Key,
                type: x.Type,
                dbIdx: dbindex,
                dbId,
                connectionName: name,
              
            }
        });
    }
}

export const redisApi = new RedisApi();