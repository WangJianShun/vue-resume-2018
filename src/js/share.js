Vue.component('share', {
  props: ['shareLink'],
  template: `
    <div class="share" v-cloak>
      <h3>点击链接进行分享:</h3>
      <textarea readonly>{{shareLink}}</textarea>
    </div>
  `
})