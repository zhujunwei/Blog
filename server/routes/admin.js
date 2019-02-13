const express =require("express");
const config=require('../config');
const utils=require('../libs/utils');

/**
 * 
 * @param {*} req 
 * @param {*} sql sql语句
 * @param {*} body 条件
 */
function queryAsBody(req, sql, body){
  return new Promise((resolve, reject) => {
    req.db.query(sql, body, (err, data) => {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

let router = express.Router();
module.exports=router;

//进入所有的admin相关的页面之前，都要校验用户身份——如果没登录过，滚去登陆(/admin/login)
//“所有的”，除了"/admin/login"
router.use((req, res, next)=>{
  console.log(req.cookies);
  if(!req.cookies['admin_token'] && req.path != '/login' && req.path != '/register'){
    res.send({
      code: -1,
      msg: "用户未登录"
    })
    res.end();
  }else{
    if(req.path === '/login' || req.path === 'register'){
      next();
    }else{
      req.db.query(`SELECT * FROM admin_token_table WHERE ID='${req.cookies['admin_token']}'`, (err, data)=>{
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else if(data.length==0){
          res.send({
            code: -1,
            msg: "用户未登录"
          })
        }else{
          req.admin_ID=data[0]['admin_ID'];
          next();
        }
      });
    }
  }
});

//提交登陆请求
router.post('/login', (req, res)=>{
  let {username, password}=req.body;
  console.log("username", username);
  console.log("password", password);
  function setToken(id){
    let ID=utils.uuid();

    let oDate=new Date();
    oDate.setMinutes(oDate.getMinutes()+20);

    let t=Math.floor(oDate.getTime()/1000);

    req.db.query(`INSERT INTO admin_token_table (ID,admin_ID,expires) VALUES('${ID}', '${id}', ${t})`, err=>{
      if(err){
        res.sendStatus(500);
      }else{
        res.cookie('admin_token', ID);
        res.send({
          code: 0,
          msg: "登录成功"
        });
      }
    });
  }

  //判断用户名
  req.db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data)=>{
    if(err){
      showError('数据库出错，请稍候重试');
    }else if(data.length==0){
      showError('用户名或密码有误');
    }else{
      console.log("data", data);
      if(data[0].password === utils.md5(`malaxiaomiantan_${password}`)){
        setToken(data[0].ID);
        console.log('普通管理员登陆成功');
      }else{
        showError('用户名或密码有误');
      }
    }
  });

  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
});

//注册请求
router.post('/register', (req, res)=>{
  let {username, password}=req.body;
  req.db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data)=>{
      if(err){
        showError('系统错误 60001');
      }else if(data.length==0){
        let pwd = utils.md5(`malaxiaomiantan_${password}`);
        let sql = `INSERT INTO admin_table VALUES (?, ?, ?, ?)`;
        let ID = utils.uuid();
        req.db.query(sql, [ID, username, pwd, 1], (err, data) => {
          if(err){
            showError('注册失败');
          }else{
            res.send({code: 0, msg: "注册成功"})
            res.end();
          }
        })
      }else{
        showError('注册失败');
      }
    });
  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
});
//获取用户信息
router.get('/getUserInfo', (req, res) => {
  req.db.query(`SELECT username FROM admin_table WHERE ID = '${req.admin_ID}'`, (err, data) => {
    if(err){
      console.log("err1", err);
      showError('系统错误 60002');
    }else {
      res.send({
        code: 0,
        msg: "ok",
        result: data[0]
      })
      res.end();
    }
  })
  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
})
//获取文章列表
router.get('/getArticleList', (req, res) => {
  req.db.query(`SELECT *  FROM admin_article_list WHERE creater = '${req.admin_ID}' AND is_delete = 0 `, (err, data) => {
    if(err){
      console.log("err1", err);
      showError('系统错误 60003');
    }else {
      res.send({
        code: 0,
        msg: "ok",
        result: data
      })
      res.end();
    }
  })
  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
})
//增加文章
router.post('/addArticle', (req, res) => {
  let {
    title,
    desc,
    article
  } = req.body;
  let adminID = req.admin_ID; //创建人的id
  let create_time = Date.now();
  let sqlList = `INSERT INTO admin_article_list (title, description, creater, create_time) VALUES (?, ?, ?, ?)`;
  let detailSql = `INSERT INTO admin_article_detail (article_detail, article_title, article_desc, create_at, update_at, ID) values (?, ?, ?, ?, ?, ?)`;
  queryAsBody(req, sqlList, [title, desc, adminID, create_time + ""])
    .then((data) => {
      let id = data.insertId;
      return queryAsBody(req, detailSql, [article, title, desc, create_time, create_time, id])
    })
    .then(res2 => {
      res.send({
        code: 0,
        msg: "ok",
        result: true
      })
    })
    .catch(err => {
      console.log(err)
    })
  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
})

//删除文章
router.post('/deleteArticle', (req, res) => {
  let {
    id
  } = req.body;
  let sql = `UPDATE admin_article_list SET is_delete = 1 WHERE ID = ${id}`;
  req.db.query(sql, (err, data) => {
    if(err){
      console.log("err1", err);
      showError('系统错误 60003');
    }else {
      res.send({
        code: 0,
        msg: "ok",
        result: true
      })
      res.end();
    }
  })
  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
})

//修改文章
router.post('/updateArticle', (req, res) => {
  let {
    title,
    desc,
    article,
    ID
  } = req.body;
  let create_time = Date.now();
  let sqlList = `UPDATE admin_article_list SET title = ?, description = ? WHERE ID = ?`;
  let detailSql = `UPDATE admin_article_detail SET article_detail = ? , article_title = ? , article_desc = ?, update_at = ?`;
  queryAsBody(req, sqlList, [title, desc, ID])
    .then((data) => {
      return queryAsBody(req, detailSql, [article, title, desc, create_time])
    })
    .then(res2 => {
      res.send({
        code: 0,
        msg: "ok",
        result: true
      })
    })
    .catch(err => {
      console.log(err)
    })
  function showError(msg){
    res.send({code: -1, msg: msg});
    res.end();
  }
})
