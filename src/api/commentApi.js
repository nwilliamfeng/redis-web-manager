import { ApiHelper } from './apiHelper'
import {connectionStates,dbStates} from '../constants'

class CommentApi {


   
    async getCommentList() {
        const json = await ApiHelper.get('/config/getlist');
        const { Data, Message, Code } = json;
        if (Code === 2)
            throw new Error(Message);
        return Data.map(x => { return { id: x.Name, name: x.Name, ip: x.IP, port: x.Port, } });
    }

    async getReplyList(){
        return JSON.parse('{"re":[{"reply_id":1797850791,"reply_user":{"user_id":"0622509977066280","user_nickname":"小乔","user_name":"CTo2rlZ","user_v":0,"user_type":0,"user_is_majia":false,"user_level":1,"user_first_en_name":"yqzynk","user_age":"1天","user_influ_level":1,"user_black_type":0},"reply_guba":{"stockbar_type":2,"stockbar_code":"hk391477","stockbar_name":"真慧","stockbar_market":"391477.hk","stockbar_quote":1,"stockbar_exchange":100},"reply_ip":"221.212.103.69","reply_publish_time":"2014-05-23 09:32:19","reply_text":"我不信","reply_like_count":2,"reply_is_like":true," reply_dialog_id ":0,"reply_checkState":0,"source_reply_id":1818372901,"source_reply_state":0,"source_reply_text":"是不是啊","source_reply_user_id":"7742997009190522","source_reply_ip":"156.243.22.45","source_reply_user_nickname":"小宗","source_reply_user_type":1,"source_post_id":80850652,"source_post_state":2,"source_post_ip":"182.153.12.14"," source_post_type ":0,"source_post_user_id":"1830821877747177","source_post_user_nickname":"小一","source_post_user_type":1,"source_post_user_is_majia":false,"source_post_title":"无题"},{"reply_id":1974869392,"reply_user":{"user_id":"2894582192948422","user_nickname":"笑笑","user_name":"fE0rF","user_v":0,"user_type":1,"user_is_majia":false,"user_level":5,"user_first_en_name":"wszmflypf","user_age":"1天","user_influ_level":1,"user_black_type":0},"reply_guba":{"stockbar_type":2,"stockbar_code":"hk391477","stockbar_name":"小葱","stockbar_market":"391477.hk","stockbar_quote":1,"stockbar_exchange":100},"reply_ip":"99.126.156.133","reply_publish_time":"2014-05-24 09:32:19","reply_text":"今天下班还是有点晚啊","reply_like_count":2,"reply_is_like":true," reply_dialog_id ":123,"source_reply_id":0,"source_reply_state":0,"source_reply_text":"","source_reply_user_id":"","source_reply_ip":"156.243.22.45","source_reply_user_nickname":"","source_reply_user_type":1,"source_post_id":24058782,"source_post_state":0,"source_post_ip":"182.153.12.14","source_post_type":0,"source_post_user_id":"8668401740233330","source_post_user_nickname":"小侯","source_post_user_type":1,"source_post_user_is_majia":false,"source_post_title":"可以的","third_post_id":"2017032709084184153"}],"count":2,"rc":1,"me":""}')
    }

    // async login(userName, password, ip, appKey, staffstate = 1) {
    //     const url = serviceUrls.URL_LOGIN;
    //     return await ApiHelper.post(url, { userName, password, ip, appKey, staffstate });
    // }
}

export const commentApi = new CommentApi();