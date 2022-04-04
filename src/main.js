import Vue from 'vue'
import App from './App'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.component("modal", {
  template: "#modal-template"
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

Vue.config.devtools = true