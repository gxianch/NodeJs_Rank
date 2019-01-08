var db = {};
var redis = require("redis");
var client = redis.createClient('23308','111.23.6.233');
//var client = redis.createClient('23308','127.0.0.1');
client.on("error", function (err) {
    console.log("Error :" , err);
});

client.on('connect', function(){
    console.log('Redis连接成功.');
})

/**
 * 添加string类型的数据
 * @param key 键
 * @params value 值
 * @params expire (过期时间,单位秒;可为空，为空表示不过期)
 * @param callBack(err,result)
 */
db.set = function(key, value, expire, callback){

    client.set(key, value, function(err, result){

        if (err) {
            console.log(err);
            callback(err,null);
            return;
        }

        if (!isNaN(expire) && expire > 0) {
            client.expire(key, parseInt(expire));
        }

        callback(null,result)
    })
}

/**
 * 查询string类型的数据
 * @param key 键
 * @param callBack(err,result)
 */
db.get = function(key, callback){

    client.get(key, function(err,result){

        if (err) {
            console.log(err);
            callback(err,null)
            return;
        }

        callback(null,result);
    });
}
db.zunionstore = function(destination ,numkeys ,key,key0,key1,key2,key3,key4,key5,callback){

    client.zunionstore(destination ,numkeys , key,key0,key1,key2,key3,key4,key5,function(err,result){

        if (err) {
            console.log(err);
           callback(err,null);
            return;
        }

        callback(null,result);
    });
}
// var arr = new Array()
// arr.push('playCount:20181216:3')
// arr.push('playCount:20181217:3')
// str = 'playCount:20181216:3'+','+'playCount:20181217:3'
// // //client.zunionstore("aa",2,'playCount:20181216:3','playCount:20181217:3')
//  client.zunionstore("haha",arr.length,arr[0],arr[1])

db.zrevrangebyscore = function(key, offset, count,callback){

    client.zrevrangebyscore(key,'+inf', '-inf','WITHSCORES', 'LIMIT',offset,count,function(err,result){
        if (err) {
            console.log(err);
            callback(err,null)
            return;
        }
        callback(null,result);
    });
}


module.exports = db;
