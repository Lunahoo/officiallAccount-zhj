

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 *
 */

const config = require('../../config')
import axios from 'axios';
let baseUrl = '';
let iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi', '667895_xte3dcfrvbo6r'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `/admin/code`
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = config.dev.env.API_ROOT;
} else {
  axios.defaults.baseURL = config.build.env.API_ROOT;
}

export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl
}
