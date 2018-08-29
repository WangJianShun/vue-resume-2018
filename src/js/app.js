
window.App = {

  template: `
  <div>
  <app-aside v-show='mode==="edit"' @save="onClickSave" :logout-visible="true"  @print="print" @on-share="onShare"></app-aside>
    <main class="default">
      <div class="bg-img"></div>
      <resume :mode='mode' :display-resume='displayResume'></resume>
    </main>
  

  <button class="exitPreview" @click='mode="edit"' v-if="mode==='preview'">退出预览</button>
  </div>
  
  `,
  data() {
    return {
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
        this.$router.push('/login');
        //currentUser 为空时，可打开用户注册界面…
      }
    },

    showLogin() {
      this.loginVisible = true;
    },
    onShare() {
      if (this.hasLogin()) {
        this.shareVisible = true
      } else {
        alert('请先登录')
      }
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

    onLogin(user) {
      this.currentUser.objectId = user.objectId
      this.currentUser.email = user.email
      this.getResume(this.currentUser)
      this.loginVisible = false
    }

  },
  computed: {
    displayResume() {
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
}
Vue.component('app', App)