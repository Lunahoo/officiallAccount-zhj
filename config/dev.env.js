'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: 'http://zhihuijia.imwork.net',      //测试
  /*API_ROOT: 'http://192.168.7.29:9999',*/         //金田
  /*API_ROOT: 'http://192.168.7.13:9999',*/         //王钦
  /*API_ROOT: 'http://172.18.0.205:9999',*/         //开发
  /*API_ROOT: 'http://192.168.7.37:8089'*/          //都强
  /*API_ROOT: 'http://192.168.7.105:8089'*/          //丙辉

})
