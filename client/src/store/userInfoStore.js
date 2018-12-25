
import { observable, action } from 'mobx'

// 点击次数
class UserInfoStore {
  @observable userInfo = null;

  @observable needShowLoginBtn = false;

  @action setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
  }

  @action UpdateUserInfo = (userInfo) => {
    this.userInfo = {...this.userInfo, ...userInfo};
  }

  //退出清空状态
  @action clearUserInfo = () => {
    this.userInfo = null;
  }

  @action setLoginBtn = (flag) => {
    this.needShowLoginBtn = flag;
  }

  constructor(){
  }
}
const userInfoStore = new UserInfoStore()

export default userInfoStore