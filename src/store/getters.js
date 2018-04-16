/**
 * Created by zhangfuhao on 2018/4/12.
 */


export const isLogin = (state) => {
  let isLogin = state.isLogin
  if (!isLogin) {
    isLogin = document.cookie.indexOf('userId') >= 0 ? 1 : 0
  }
  return isLogin
}

export const userInfo = (state) => {
  let userInfo = state.userInfo
  if (JSON.stringify(userInfo) == '{}') {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
  return userInfo
}
