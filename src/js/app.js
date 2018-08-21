var app = new Vue({
  el: '#app',
  data: {
    editingName: false,
    loginVisible:false,
    signUpVisible:false,
    resume: {
      name: '名字',
      gender: '男',
      birthday: '1997年1月28日',
      jobTitle: '前端工程师',
      email: '1779011185@qq.com',
      phone: '12345679'
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
      }
      else {
        this.loginVisible=true;
        //currentUser 为空时，可打开用户注册界面…
      }
    },
    showLogin(){
      this.loginVisible=true;
    },
    
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