//当服务器给用户推送当前成员信息的时候
// 此类用作模型类，

class MemberInfo{
    id;
    name;
    constructor(id,name) {
        this.id = id;
        this.name = name;
    }
}

// module.exports = MemberInfo;
export {MemberInfo}

