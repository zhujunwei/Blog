const express =require("express");
const config=require('../config');
const utils=require('../libs/utils');
let router = express.Router();

module.exports = router;
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
//获取文章列表
router.get('/getArticleList', (req, res) => {
  req.db.query(`SELECT *  FROM admin_article_list WHERE is_delete = 0 `, (err, data) => {
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


//获取文章详情
router.get("/getArticleDetail", (req, res) => {
  let ID=req.query['ID'];
  console.log("ID", ID)
  let sqlList = `SELECT article_desc, article_detail, article_tag, article_title, create_at FROM admin_article_detail WHERE ID = ?`;
  queryAsBody(req, sqlList, [ID])
    .then(result => {
      console.log("result", result);
      res.send({
        code: 0,
        msg: "ok",
        result: result
      })
      res.end();
    })
    .catch(err => {
      res.send({code: -1, msg: "获取文章详情失败"});
      res.end();
    })
})



