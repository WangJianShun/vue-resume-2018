Vue.component('appAsside', {
  props:['logoutVisible'],
  template: `
  <aside>
      <div class="upper">
        <ul class="actions">
          <li><button class='button' @click='$emit("clickSave")'>保存</button></li>
          <li><button class='button' @click='$emit("onShare")'>分享</button></li>
          <li><button class='button' @click="$emit('print')">打印</button></li>
        </ul>
      </div>
      <div class="down">
        <button @click='$emit("onLogout")' v-show='logoutVisible'>登出</button>
      </div>
    </aside>
  `
})
