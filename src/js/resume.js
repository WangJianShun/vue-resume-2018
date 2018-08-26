Vue.component('resume', {
  data() {
    return {

    }
  },
  props: ['mode', 'displayResume'],
  methods: {
    addSkills() {
      this.resume.skills.push({ name: '请填写技能名称', description: '请填写技能描述' })
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1)
    },
    addProject() {
      this.resume.projects.push({ name: '请填写项目名称', link: 'http://....', keywords: '请填写关键词', description: '请填写详细项目描述', })
    },
  },
  template: `
  <div class="resume">
        <section class="profile">
          <h1>
            <edit-span :disabled='mode==="preview"' v-bind:value='displayResume.name' v-on:edit='onEdit("name",$event)'></edit-span>
          </h1>

          <p>
            <edit-span :disabled='mode==="preview"' v-bind:value='displayResume.jobTitle' v-on:edit='onEdit("jobTitle",$event)'></edit-span>
          </p>
          <p>
            <edit-span :disabled='mode==="preview"' v-bind:value='displayResume.birthday' v-on:edit='onEdit("birthday",$event)'></edit-span>|
            <edit-span :disabled='mode==="preview"' v-bind:value='displayResume.gender' v-on:edit='onEdit("gender",$event)'></edit-span>|
            <edit-span :disabled='mode==="preview"' v-bind:value='displayResume.email' v-on:edit='onEdit("email",$event)'></edit-span>|
            <edit-span :disabled='mode==="preview"' v-bind:value='displayResume.phone' v-on:edit='onEdit("phone",$event)'></edit-span>

          </p>
        </section>
        <section class="skills">
          <h2>技能</h2>
          <ul>
            <li v-for='skill,index in displayResume.skills'>
              <edit-span :disabled='mode==="preview"' class="name" :value="skill.name" @edit="onEdit('skills['+index+' ].name',$event)"></edit-span>
              <div class="description">
                <edit-span :disabled='mode==="preview"' :value="skill.description" @edit="onEdit('skills[' +index +'].description',$event)"></edit-span>
              </div>
              <span v-if='mode==="edit"' class="remove" v-show="index>=4" @click="removeSkills(index)">x</span>
            </li>
            <li v-if='mode==="edit"' class='add'>
              <span @click="addSkills">添加</span>
            </li>
          </ul>
        </section>
        <section class="projects">
          <h2>项目经历</h2>
          <ol>

            <li v-for="project,index in displayResume.projects">
              <header>
                <div class="start">
                  <h3 class="name">
                    <edit-span :disabled='mode==="preview"' :value='project.name' @edit="onEdit('projects['+ index +'].name',$event)"></edit-span>
                  </h3>
                  <span class="link">
                    <edit-span :disabled='mode==="preview"' :value="project.link" @edit="onEdit('projects['+ index +'].link',$event)"></edit-span>
                  </span>
                </div>
                <div class="end">
                  <span class="keywords">
                    <edit-span :disabled='mode==="preview"' :value="project.keywords" @edit="onEdit('projects['+ index+' ].keywords',$event)"></edit-span>
                  </span>
                </div>
              </header>
              <p class="description">
                <edit-span :disabled='mode==="preview"' :value="project.description" @edit="onEdit('projects['+ index +'].description',$event)"></edit-span>
              </p>
              <span v-if='mode==="edit"' class="remove" v-show="index>=2" @click="removeProject">x</span>
            </li>
            <li v-if='mode==="edit"' class="add">
              <span @click="addProject">添加</span>
            </li>
          </ol>
        </section>
      </div>
  `,
})