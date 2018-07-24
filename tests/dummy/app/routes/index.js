import Route from '@ember/routing/route';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/route';

export default Route.extend(KeyboardShortcuts, {
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
    myAction: function() {
      alert('key `s` was pressed');
    }
  }
});
