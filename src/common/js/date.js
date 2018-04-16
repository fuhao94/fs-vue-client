/**
 * Created by zhangfuhao on 2018/4/16.
 */


export function UTCformat(utc) {
  let date = new Date(utc)
  let y = date.getFullYear()
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  let m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
  return res
}
