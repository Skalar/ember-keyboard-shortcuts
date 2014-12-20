/* global Mousetrap */

import Ember from 'ember';

export default function(bindEvent, unbindEvent) {

  return Ember.Mixin.create({

    bindShortcuts: function() {
      var self = this;
      var shortcuts = this.get('keyboardShortcuts');

      if (Ember.typeOf(shortcuts) !== 'object') { return; }

      Object.keys(shortcuts).forEach(function(shortcut) {
        var actionObject   = shortcuts[shortcut];
        var binder         = 'bindGlobal';
        var preventDefault = true;

        function invokeAction(action) {
          var type = Ember.typeOf(action);

          if (type === 'string') {
            Mousetrap[binder](shortcut, function(){
              self.send(action);
              return preventDefault !== true;
            });
          }
          else if (type === 'function') {
            Mousetrap[binder](shortcut, action);
          }
          else {
            throw new Error('Invalid value for keyboard shortcut: ' + action);
          }
        }

        if (Ember.typeOf(actionObject) === 'object') {
          if (actionObject.global === false) { binder = 'bind'; }

          if (actionObject.preventDefault === false) {
            preventDefault = false;
          }

          invokeAction(actionObject.action);
        }
        else {
          invokeAction(actionObject);
        }

      });

    }.on(bindEvent),

    unbindShortcuts: function() {
      var shortcuts = this.get('keyboardShortcuts');

      Object.keys(shortcuts).forEach(
        function(shortcut) {
          Mousetrap.unbind(shortcut);
        }
      );
    }.on(unbindEvent)

  });


}
