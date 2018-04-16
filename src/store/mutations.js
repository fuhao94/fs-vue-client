/**
 * Created by zhangfuhao on 2018/4/12.
 */

import * as types from './mutation-types'

const mutations = {
  [types.SET_IS_LOGIN](state, isLogin) {
    state.isLogin = isLogin
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }
}

export default mutations
