const http=require('http'),mysql=require('mysql'),express=require('express'),qs=require('querystring');
var app=express();
var server=http.createServer(app);
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'yinchengmall',
    port:3306,
    connectionLimit:25
});
server.listen(8081);
app.use(express.static('public'));
app.post("/addUser",(req,res)=>{
    req.on("data",(data)=>{
        var obj=qs.parse(data.toString());
        var uPwd=obj.userPwd,uTel=obj.userTel;
        pool.getConnection((err,conn)=>{
            var sql="INSERT INTO ycm_user VALUES(null,?,?)";
            conn.query(sql,[uPwd,uTel],(err,result)=>{
                if(err)  res.json({code:-1,msg:"注册失败"});
                else {res.json({code:1,msg:"注册成功"});
                    conn.release();}
            });
        })
    })
});
app.post('/login',(req,res)=>{
    req.on('data',(data)=>{
        var obj=qs.parse(data.toString());
        pool.getConnection((err,conn)=>{
            var sql="SELECT uid FROM ycm_user WHERE upwd=? AND utel=?";
            conn.query(sql,[obj.uTel,obj.uPwd],(err,result)=>{
                if(err) res.json({code:-1,msg:'登录失败'});
                else {
                    if(result[0]==undefined) res.json({code:-2,msg:'登录失败'});
                   else{ res.json({code:1,msg:'登录成功',uid:result[0].uid})}
                }
            })
        })
    })
});
app.post('/getData',(req,res)=>{
    req.on('data',(data)=>{
        var fn=qs.parse(data.toString()).formName;
        pool.getConnection((err,conn)=>{
            var sql="SELECT * FROM "+fn;
            console.log(sql);
            conn.query(sql,(err,result)=>{
                if(err) res.json({code:-1,msg:'查询失败'});
                else {
                    res.json(result);
                }
            })
        })
    })
});
app.post('/sendSug',(req,res)=>{
    req.on('data',(data)=>{
        var obj=qs.parse(data.toString());
        var t=obj.title,c=obj.content,p=obj.uTel;
        pool.getConnection((err,conn)=>{
            var sql="INSERT INTO ycm_suggestion VALUES(null,?,?,?)";
            conn.query(sql,[t,c,p],(err,result)=>{
                if(err) {res.json({code:-1,msg:'提交失败'});}
                else {
                    res.json({code:1,msg:'提交成功'});
                }
            })
        })
    })
});