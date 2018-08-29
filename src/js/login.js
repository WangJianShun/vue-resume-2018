window.Login = {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onLogin() {
      AV.User.logIn(this.login.email, this.login.password).then((user) => {
        user = user.toJSON()
        this.$emit('login', user)
        this.loginVisible = false
      }, function (error) {
        if (error.code === 211) {
          alert('邮箱不存在')
        } else if (error.code === 210) {
          alert('用户名和密码不匹配')
        }
      });
    },
    onClickSignUp() {
      this.$emit('goTosignUp')
    },

  },
  template: `
  <div class="login" v-cloak>
  <form class="form" @submit.prevent='onLogin'>
    <h2>登录</h2>
    <router-link to="/">关闭</router-link>
    <div class="row">
      <label>邮箱</label>
      <input type="text" v-model="login.email">
    </div>
    <div class="row">
      <label for="">密码</label>
      <input type="text" v-model="login.password">
    </div>
    <div class="row">
      <button type="submit">提交</button>
      <router-link to="/signUp">注册</router-link>
    </div>
  </form>
</div>
  `
}
Vue.component('login',window.Login)