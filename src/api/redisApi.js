import { ApiHelper } from './apiHelper'
import { connectionStates, dbStates } from '../constants'
import {random} from 'lodash'

class RedisApi {

    async getConnectionInfo(connectionName) {
        const result={cpuUsage:0,memoryUsage:0};
        
         result.cpuUsage= await this._getConnectionUsageInfo(connectionName,true);
         result.memoryUsage= await this._getConnectionUsageInfo(connectionName,false);
         return result;
    }

    async _getConnectionUsageInfo(connectionName,isCpu=true){
        const json = await ApiHelper.get(`/redis/getinfo?name=${connectionName}&isCpu=${isCpu}`);
        const { Data, Code } = json;
        if (Code === 2){
            return 0;
        }
            
        return random(0.00001,0.0001,true)+  Number.parseFloat( Data);
    }

    /**
     * 获取配置
     */
    async getConfigs() {
        const json = await ApiHelper.get('/config/getlist');
        const { Data, Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Data.map(x => { return { id: x.Name, name: x.Name, ip: x.IP, port: x.Port, connectionState: connectionStates.NONE } });
    }

    async setConnection(name, ip, port, password) {
        const json = await ApiHelper.get(`/config/set?Name=${name}&IP=${ip}&Port=${port}&Password=${password}`);
        const { Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
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

    async getStringKeyValue(connectionName, dbIdx, key) {
        const json = await ApiHelper.get(`/redis/get?name=${connectionName}&dbindex=${dbIdx}&key=${key}`);
        const { Message, Code, Data } = json;
        if (Code === 2)
            throw new Error(Message);
        return Data;
    }

    /**
     * 删除键
     */
    async deleteKey(key, connectionName, dbIdx) {
        const json = await ApiHelper.get(`/redis/del?name=${connectionName}&dbindex=${dbIdx}&key=${key}`);
        const { Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Code === 1;
    }

    async deleteKeyItem(key, type, id, connectionName, dbIdx) {
        const json = await ApiHelper.get(`/redis/delitem?name=${connectionName}&dbindex=${dbIdx}&type=${type}&id=${id}&key=${key}`);
        const { Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Code === 1;
    }

    async deleteZSetItem(value, type, id, connectionName, dbIdx) {
        const json = await ApiHelper.get(`/redis/delitem?name=${connectionName}&dbindex=${dbIdx}&type=${type}&id=${id}&value=${value}`);
        const { Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Code === 1;
    }


    async _editOrSetKeyItem(opName, type, id, key, value, connectionName, dbIdx) {
        const url = `/redis/${opName}?Name=${connectionName}&DBIndex=${dbIdx}&Id=${id}&Type=${type}&Value=${value}`;
        const json = await ApiHelper.get(key == null ? url : url + `&Key=${key}`);
        const { Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Code === 1;
    }

    // async _editOrSetKeyItem(opName, type, id, key, value, connectionName, dbIdx) {
    //     const url = `/redis/${opName}`;
    //     const data=key? {name:connectionName,dbindex:dbIdx,id,type,value,key}:{name:connectionName,dbindex:dbIdx,id,type,value};
    //     const json = await ApiHelper.postByForm(url,data);
    //     const { Message, Code } = json;
    //     if (Code === 2)
    //         throw new Error(Message);
    //     return Code === 1;
    // }

    /**
    * 编辑子键
    */
    async editKeyItem(type, id, key, value, connectionName, dbIdx) {
        return await this._editOrSetKeyItem('edit',type, id, key, value, connectionName, dbIdx);
    }



   /**
   * 编辑子键
   */
    async setKeyItem(type, id, key, value, connectionName, dbIdx) {
        return await this._editOrSetKeyItem('set',type, id, key, value, connectionName, dbIdx);
    }


    async getKeyItems(connectionName, dbIdx, keyType, id, key = '*', offset = 0) {
        const json = await ApiHelper.get(`/redis/getItems?name=${connectionName}&dbindex=${dbIdx}&type=${keyType}&key=${key}&id=${id}&offset=${offset}`);
        const { Data, Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);

        return Data;
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
        return Data.map(x => { return { id: `${name}-${x}`, dbIdx: x, connectionName: name, dbState: dbStates.NONE, } });
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