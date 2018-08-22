var app = new Vue({
  el: '#app',
  data: {
    editingName: false,
    loginVisible: false,
    signUpVisible: false,
    currentUser: { id: '', email: '', },
    resume: {
      name: '名字',
      gender: '男',
      birthday: '1997年1月28日',
      jobTitle: '前端工程师',
      email: '1779011185@qq.com',
      phone: '12345679'
    },
    signUp: {
      email: '',
      password: '',
    },
    login: {
      email: '',
      password: '',
    }
  },
  methods: {
    onEdit(key, value) {
      this.resume[key] = value
    },
    onClickSave() {
      var currentUser = AV.User.current();
      if (currentUser) {
        // 跳转到首页
        this.saveResume()
        console.log(currentUser)

      }
      else {
        this.loginVisible = true;
        //currentUser 为空时，可打开用户注册界面…
      }
    },

    showLogin() {
      this.loginVisible = true;
    },
    onSignUp(e) {
      const user = new AV.User();
      // 设置用户名
      user.setUsername(this.signUp.email);
      // 设置密码
      user.setPassword(this.signUp.password);
      // 设置邮箱
      user.setEmail(this.signUp.email);
      user.signUp().then(function (user) {
        console.log(user);
      }, function (error) {
      });
    },

    onLogin() {
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        this.currentUser.id = user.id,
          this.currentUser.email = user.email
      }, function (error) {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code === 210) {
          alert('用户名和密码不匹配')
        }
      });
    },

    saveResume() {
      let { id } = AV.User.current()
      var user = AV.Object.createWithoutData('User', id);
      // 修改属性
      user.set('resume', this.resume);
      // 保存到云端
      user.save();
    },
    onLogout() {
      AV.User.logOut();
      alert('注销成功')
      // 现在的 currentUser 是 null 了
      var currentUser = AV.User.current();
    }
    /** 声明类型
    var User = AV.Object.extend('User');
    // 新建对象
    var user = new User();
    // 设置名称
    user.set('name', '工作');
    // 设置优先级
    user.set('priority', 1);
    user.save().then(function (todo) {
      console.log('objectId is ' + todo.id);
    }, function (error) {
      console.error(error);
  });**/

  }
})
let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser
}