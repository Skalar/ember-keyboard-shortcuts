import Route from '@ember/routing/route';
import {
  initializeKeyboardShortcuts,
  destroyKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.keyboardShortcuts = {
      s: {
        action: 'myAction', // action to trigger
        global: false, // whether to trigger inside input (default: true)
        preventDefault: true // (default: true)
      }
    };
  },

  actions: {
    myAction() {
      alert('key `s` was pressed');
    }
  },

  activate() {
    this._super(...arguments);
    initializeKeyboardShortcuts(this);
  },

  deactivate() {
    this._super(...arguments);
    destroyKeyboardShortcuts(this);
  }
});
