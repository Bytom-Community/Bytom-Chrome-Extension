import dialog from "./component"
import Vue from 'vue';

let instance;
const dialogInstance = {
  install: function (Vue, options) {
    Vue.component('v-dialog', dialog);
    Vue.prototype.$dialog = dialogInstance;
  },
  close: function() {
    if(instance) {
      instance.$children[0].closeDialog();
      instance.onClose();
    }
  },
  show: function(op) {
    let data = {
      header: op.header,
      body: op.body,
    };
    if (op.confirm) {
      data.confirm = op.confirm;
    }
    instance = new Vue({
      data: data,
      methods: {
        onClose: function() {
          this.$destroy();
          document.getElementById("app").removeChild(this.$el);
        },
      },
      render (h) {
        return h(dialog, {
          props: {
            header: this.header,
            body: this.body,
            confirm: this.confirm,
          },
          on: {
            onClose: this.onClose,
          }
        });
      }
    });
    const component = instance.$mount();
    document.getElementById("app").appendChild(component.$el);
    instance.$children[0].showDialog();
  }
};

export default dialogInstance;