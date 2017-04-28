var restify = require('restify');
var fs = require('fs');
var server_port = 5400;


global.logs = require('./logs/logs').logs
global.util = require('./util/util').osUtil;

//respond信息
global.resmsg = JSON.parse(fs.readFileSync('config/resmsg.json'))
//全局配置
global.config = JSON.parse(fs.readFileSync('config/config.json'))
global.dbs = {};
global.cmds = {};
global.uuid = require("./util/util").uuid

//加载控制器
var controller = require('./controller/controller');
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
  mapParams: true
}));

server.use(restify.dateParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.CORS());

//路由控制

server.get('/api/:controller/:cmd', controller.controller);
server.post('/api/:controller/:cmd', controller.controller);

//用户验证

server.get('/user/login', controller.userlogin);
server.post('/user/login', controller.userlogin);


server.listen(server_port, function () {
  console.log('server start ports:', server_port);
});
