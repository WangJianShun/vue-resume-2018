Vue.component('appAside', {
  props:['logoutVisible'],
  methods:{
    onLogout() {
      AV.User.logOut();
      alert('注销成功')
      // 现在的 currentUser 是 null 了
      var currentUser = AV.User.current();
    },
    
  },
  template: `
  <aside>
      <div class="upper">
        <ul class="actions">
          <li><button class='button' @click='$emit("save")'>保存</button></li>
          <li><button class='button' @click='$emit("onShare")'>分享</button></li>
          <li><button class='button' @click="$emit('print')">打印</button></li>
        </ul>
      </div>
      <div class="down">
        <button @click='onLogout' v-show='logoutVisible'>登出</button>
      </div>
    </aside>
  `
})
