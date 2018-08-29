window.SignUp = {
  data() {
    return {
      signUp: {
        email: '',
        password: '',
      },
    }
  },
  methods: {

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
        this.$emit('signUp')

      }, (error) => {
        alert('此邮箱已经被占用')
      });
    },
    onClickLogin() {
      this.emit('goToLogin')
    }
  },
  template: `
     <div class="signUp" v-cloak>
      <form class="form" @submit.prevent='onSignUp'>
        <h2>注册</h2>
        <button @click='loginVisible=false'>关闭</button>
        <div class="row">
          <label for="">邮箱</label>
          <input type="text" v-model='signUp.email'>
        </div>
        <div class="row">
          <label for="">密码</label>
          <input type="password" v-model='signUp.password'>
        </div>

        <div class="row">
          <button type="submit">提交</button>
          <router-link to="/login">登录</router-link>
        </div>
      </form>
    </div>
  `
}
Vue.component('signup',window.SignUp)