var app = new Vue({
  el: '#app',
  data: {
    editingName: false,
    loginVisible: false,
    signUpVisible: false,
    shareVisible: false,
    currentUser: { objectId: '', email: '', },
    resume: {
      name: '名字',
      gender: '男',
      birthday: '1997年1月28日',
      jobTitle: '前端工程师',
      email: '1779011185@qq.com',
      phone: '12345679',

      skills: [
        { name: '请填写技能名称', description: '请填写技能描述', },
        { name: '请填写技能名称', description: '请填写技能描述', },
        { name: '请填写技能名称', description: '请填写技能描述', },
        { name: '请填写技能名称', description: '请填写技能描述', },
      ],
      projects: [
        { name: '请填写项目名称', link: 'http://....', keywords: '请填写关键词', description: '请填写详细项目描述', },
        { name: '请填写项目名称', link: 'http://....', keywords: '请填写关键词', description: '请填写详细项目描述', },
      ],
      previewUser: {
        objectId: undefined,
      },
    },

    signUp: {
      email: '',
      password: '',
    },
    login: {
      email: '',
      password: '',
    },
    shareLink: '不知道'
  },
  watch: {
    'currentUser.objectId': function (newValue, oldValue) {
      if (newValue) {
        this.getResume(this.currentUser)
      }
    }
  },
  methods: {
    onEdit(key, value) {
      let regex = /\[(\d+)\]/g
      key = key.replace(regex, (match, number) => `.${number}`)
      keys = key.split('.')
      let result = this.resume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
        } else {
          result = result[keys[i]]
        }
        //result =this.result
        //keys=:['skills','0','name']
        //i=0 result ===result['skills']=this.resume.skills
        //i=2 result === result['0']=this.resume.skills.0
        // i= 3 result===result['name']=this.resume.skills.0.name
        //result ===this.resume['skills']['0']['name']
      }
    },
    onClickSave() {
      var currentUser = AV.User.current();
      if (currentUser) {
        // 跳转到首页
        this.saveResume()
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
      user.signUp().then((user) => {
        alert('注册成功');
        user = user.toJSON()
        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
        this.signUpVisible = false

      }, (error) => {
        alert('此邮箱已经被占用')
      });
    },

    onLogin() {
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        user = user.toJSON()

        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
        this.loginVisible = false
      }, function (error) {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code === 210) {
          alert('用户名和密码不匹配')
        }
      });
    },
    hasLogin() {
      return !!this.currentUser.objectId
    },
    saveResume() {
      let { objectId } = AV.User.current().toJSON()
      let user = AV.Object.createWithoutData('User', objectId);
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
    },
    getResume(user) {
      var query = new AV.Query('User');

      query.get(user.objectId).then((user) => {
        let resume = user.toJSON().resume
        Object.assign(this.resume, resume)
      }, function (error) {
        // 异常处理
        console.log("出现异常")
      });
    },
    addSkills() {
      this.resume.skills.push({ name: '请填写技能名称', description: '请填写技能描述' })
    },
    addProject() {
      this.resume.projects.push({ name: '请填写项目名称', link: 'http://....', keywords: '请填写关键词', description: '请填写详细项目描述', })
    },
    removeSkills(index) {
      this.resume.skills.splice(index, 1)
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1)
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
let search = location.search
let regex = /user_id=([^&]+)/
matches = search.match(regex)
if (matches) {
  let userId = matches[1]
  console.log(userId)
} else {
  let currentUser = AV.User.current()
  if (currentUser) {
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser)
  }
}

