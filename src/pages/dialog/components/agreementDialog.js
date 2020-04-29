import Vue from 'vue';
import AgreementHint from './agreementHint';

let instance;

const fnTypes = ['show'];

const AgreementConstruct = Vue.extend(AgreementHint);

const AgreementDialog = function(options = {}) {
  if (!instance) {
    instance = new AgreementConstruct({
      data: options
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  } else {
    Object.assign(instance.$data, options);
  }
  return instance;
};

fnTypes.forEach(type => {
  AgreementDialog[type] = options => AgreementDialog(options).openHint();
});

AgreementDialog.close = () => {
  instance.closeHint();
};

export default AgreementDialog;
