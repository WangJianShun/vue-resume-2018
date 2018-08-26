var app = new Vue({
  el: '#app',
  data: {
    editingName: false,
    loginVisible: false,
    signUpVisible: false,
    shareVisible: false,
    skinPickerVisible: false,
    currentUser: { objectId: '', email: '', },
    previewResume: {

    },
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

    shareLink: '不知道',
    mode: 'edit' //'preview'
  },
  watch: {
    'currentUser.objectId': function (newValue, oldValue) {
      if (newValue) {
        this.getResume(this.currentUser).then((resume) => {
          this.resume = resume
        })
      }
    }
  },
  computed: {
    displayResume() {
      return this.mode === 'preview' ? this.previewResume : this.resume
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

      return query.get(user.objectId).then((user) => {
        let resume = user.toJSON().resume
        return resume
      }, function (error) {
        // 异常处理
        console.log("出现异常")
      });
    },
    
    
    removeSkills(index) {
      this.resume.skills.splice(index, 1)
    },
    
    print() {
      window.print()
    },
    onShare() {
      if (this.hasLogin()) {
        this.shareVisible = true
      } else {
        alert('请先登录')
      }
    },
    onLogin(user){
      this.currentUser.objectId=user.objectId
      this.currentUser.email=user.email
      this.getResume(this.currentUser)
      this.loginVisible=false
    }
  
  }
})

let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser.toJSON()
  app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
  app.getResume(app.currentUser).then((resume) => {
    app.resume = resume
  })
}

let search = location.search
let regex = /user_id=([^&]+)/
matches = search.match(regex)
let userId
if (matches) {
  userId = matches[1]

  app.mode = 'preview'
  app.getResume({ objectId: userId }).then((resume) => {
    app.previewResume = resume
  })
}
