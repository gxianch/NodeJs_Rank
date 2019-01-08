var express = require('express');
var router = express.Router();


var redisdb = require('../models/redis')
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// var time1 = new Date().Format("yyyy-MM-dd");
//
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });

const today = new Date().Format("yyyyMMdd");
const  playCount = "playTime:";
var preDate = new Date(new Date().getTime() - 24*60*60*1000);
const yesterday = preDate.Format("yyyyMMdd");
router.route('/day/movie').get(function(req, res) {
    const   key =playCount+today+':3'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});

router.route('/day/cartoon').get(function(req, res) {
    var   key =playCount+today+':7'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});
router.route('/day/tele').get(function(req, res) {
    var   key =playCount+today+':2'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});
router.route('/day/variety').get(function(req, res) {
    var   key =playCount+today+':6'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});

router.route('/yesterday/movie').get(function(req, res) {
    const   key =playCount+yesterday+':3'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});

router.route('/yesterday/cartoon').get(function(req, res) {
    var   key =playCount+yesterday+':7'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});
router.route('/yesterday/tele').get(function(req, res) {
    var   key =playCount+yesterday+':2'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});
router.route('/yesterday/variety').get(function(req, res) {
    var   key =playCount+yesterday+':6'
    redisdb.zrevrangebyscore(key, 0, 10, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        if (result.length === 0) {
            console.log("result.length === 0");
            return
        }
        var arr = new Array()
        for (var i = 0; i <= result.length; i = i + 2) {
            if (result[i] != undefined) {
                var str = {}
                str["value"] = result[i]
                str["score"] = result[i + 1]
                arr.push(str)
            }
        }
        res.json(arr)
    })
});

router.route('/week/movie').get(function(req, res) {
    const   key =playCount+today+':3'
    var  otherKeys = new Array()
    for(var i=1; i<7;i++	) {
        var time=   new Date(new Date().getTime() - i*24*60*60*1000).Format("yyyyMMdd");
        otherKeys.push("playCount:"+time+":"+3);
    }
    redisdb.zunionstore(key+"week",7,key,otherKeys[0],otherKeys[1],otherKeys[2],otherKeys[3],otherKeys[4],otherKeys[5],function(err,result){
        if (err) {
            console.log(err);
            return;
        }
        redisdb.zrevrangebyscore(key+"week", 0, 10, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            if (result.length === 0) {
                console.log("result.length === 0");
                return
            }
            var arr = new Array()
            for (var i = 0; i <= result.length; i = i + 2) {
                if (result[i] != undefined) {
                    var str = {}
                    str["value"] = result[i]
                    str["score"] = result[i + 1]
                    arr.push(str)
                }
            }
            res.json(arr)
        })
    });
});
router.route('/week/tele').get(function(req, res) {
    const   key =playCount+today+':2'
    var  otherKeys = new Array()
    for(var i=1; i<7;i++	) {
        var time=   new Date(new Date().getTime() - i*24*60*60*1000).Format("yyyyMMdd");
        otherKeys.push("playCount:"+time+":"+2);
    }
    redisdb.zunionstore(key+"week",7,key,otherKeys[0],otherKeys[1],otherKeys[2],otherKeys[3],otherKeys[4],otherKeys[5],function(err,result){
        if (err) {
            console.log(err);
            return;
        }
        redisdb.zrevrangebyscore(key+"week", 0, 10, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            if (result.length === 0) {
                console.log("result.length === 0");
                return
            }
            var arr = new Array()
            for (var i = 0; i <= result.length; i = i + 2) {
                if (result[i] != undefined) {
                    var str = {}
                    str["value"] = result[i]
                    str["score"] = result[i + 1]
                    arr.push(str)
                }
            }
            res.json(arr)
        })
    });
});
router.route('/week/cartoon').get(function(req, res) {
    const   key =playCount+today+':7'
    var  otherKeys = new Array()
    for(var i=1; i<7;i++	) {
        var time=   new Date(new Date().getTime() - i*24*60*60*1000).Format("yyyyMMdd");
        otherKeys.push("playCount:"+time+":"+7);
    }
    redisdb.zunionstore(key+"week",7,key,otherKeys[0],otherKeys[1],otherKeys[2],otherKeys[3],otherKeys[4],otherKeys[5],function(err,result){
        if (err) {
            console.log(err);
            return;
        }
        redisdb.zrevrangebyscore(key+"week", 0, 10, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            if (result.length === 0) {
                console.log("result.length === 0");
                return
            }
            var arr = new Array()
            for (var i = 0; i <= result.length; i = i + 2) {
                if (result[i] != undefined) {
                    var str = {}
                    str["value"] = result[i]
                    str["score"] = result[i + 1]
                    arr.push(str)
                }
            }
            res.json(arr)
        })
    });
});
router.route('/week/variety').get(function(req, res) {
    const   key =playCount+today+':6'
    var  otherKeys = new Array()
    for(var i=1; i<7;i++	) {
        var time=   new Date(new Date().getTime() - i*24*60*60*1000).Format("yyyyMMdd");
        otherKeys.push("playCount:"+time+":"+6);
    }
    redisdb.zunionstore(key+"week",7,key,otherKeys[0],otherKeys[1],otherKeys[2],otherKeys[3],otherKeys[4],otherKeys[5],function(err,result){
        if (err) {
            console.log(err);
            return;
        }
        redisdb.zrevrangebyscore(key+"week", 0, 10, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            if (result.length === 0) {
                console.log("result.length === 0");
                return
            }
            var arr = new Array()
            for (var i = 0; i <= result.length; i = i + 2) {
                if (result[i] != undefined) {
                    var str = {}
                    str["value"] = result[i]
                    str["score"] = result[i + 1]
                    arr.push(str)
                }
            }
            res.json(arr)
        })
    });
});

// router.route('/rank/:day/:movie').get(function(req, res) {
//         var logstr = JSON.stringify({url:req.path});
//        console.log(logstr)
//   //      console.log(req.params.rank+":"+req.params.day+":"+req.params.movie);
//         var key = ' ';
//         var play= ' ';
//         play = "playCount:";
//         if(req.params.day === 'day'){
//             var today = new Date().Format("yyyyMMdd");
//             if(req.params.movie = 'movie'){
//                 key =play+today+':3'
//              var arr =   get4redis(key);
//                 res.json(arr)
//             }else if(req.params.movie = 'cartoon'){
//                 key =play+today+':7'
//                 var arr =   get4redis(key);
//                 res.json(arr)
//             }else if(req.params.movie = 'tele'){
//                 key =play+today+':2'
//                 var arr =   get4redis(key);
//                 res.json(arr)
//             }else if(req.params.movie = 'variety'){
//                 key =play+today+':6'
//                 var arr =   get4redis(key);
//                 res.json(arr)
//             }
//         }
// });


module.exports = router
