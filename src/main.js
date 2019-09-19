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
      this.session.consulta = {
        isActive: false
      }
      console.log("User Authenticated: ", this.session);
    });

    this.$on('startConsulta', (data) => {
      console.log("Start Consulta: ", this.session);
      this.session.consulta = {
        isActive: true,
        event: data.event,
        person: data.person,
        odontograma: {
          anotacao: ''
        }
      }
    });

    this.$on('clearConsulta', () => {
      console.log("Clear Consulta: ", this.session);
      this.session.consulta = {
        isActive: false
      }
    });

    this.$on('logout', () => {
      console.log("Logout: ", this.session);
      this.session = {isActive: false};
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
