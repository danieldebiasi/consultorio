import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue();

Vue.prototype.$state = new Vue({
  data: {
    session: {
      isActive: false
    }
  },
  methods: {
    
  },
  created() {
    this.$on('user-authenticated', (user, roles) => {
      this.session.isActive = true;
      this.session.user = user;
      this.session.user.roles = roles;
      console.log("STATE MGR: ", this.session);
    });

    this.$on('logout', () => {
      this.session.isActive = false;
      this.session.user = {};
      console.log(this.session);
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
