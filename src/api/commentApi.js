import { ApiHelper } from './apiHelper'


class CommentApi {

 

    async getComments(postId,sortType=-1,page=1,pageSize=20) {
       
        const url =`/reply/api/Reply/ArticleNewReplyList?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&postid=${postId}&p=${page}&ps=${pageSize}&sortType=${sortType}`
        return await ApiHelper.get(url);
    }

    async getReplys(postid,replyid,sortType=-1,page=1,pageSize=20) {
      
        const url =`/reply/api/Reply/ArticleReplyDetail?deviceid=a21323asdf21a32f&version=300&product=guba&plat=web&postid=${postid}&replyid=${replyid}&p=${page}&ps=${pageSize}&sortType=${sortType}`;
        return await ApiHelper.get(url);
    }

}

export const commentApi = new CommentApi();