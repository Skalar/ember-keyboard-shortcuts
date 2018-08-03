import Route from '@ember/routing/route';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
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
    bindKeyboardShortcuts(this);
  },

  deactivate() {
    this._super(...arguments);
    unbindKeyboardShortcuts(this);
  }
});
