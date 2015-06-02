/* global Mousetrap */

import Ember from 'ember';

export default function(bindEvent, unbindEvent) {

  return Ember.Mixin.create({

    bindShortcuts: Ember.on(bindEvent, function() {
      var self = this;
      var shortcuts = this.get('keyboardShortcuts');

      if (Ember.typeOf(shortcuts) !== 'object') { return; }

      this.mousetraps = [];

      Object.keys(shortcuts).forEach(function(shortcut) {
        var actionObject   = shortcuts[shortcut];
        var mousetrap      = new Mousetrap(document.body);
        var preventDefault = true;

        function invokeAction(action) {
          var type = Ember.typeOf(action);

          if (type === 'string') {
            mousetrap.bind(shortcut, function(){
              self.send(action);
              return preventDefault !== true;
            });
          }
          else if (type === 'function') {
            mousetrap.bind(shortcut, action.bind(self));
          }
          else {
            throw new Error('Invalid value for keyboard shortcut: ' + action);
          }
        }

        if (Ember.typeOf(actionObject) === 'object') {
          if (actionObject.global === false) {
            mousetrap = new Mousetrap(document);
          } else if (actionObject.scoped) {
            mousetrap = new Mousetrap(self.get('element'));
          } else if (actionObject.targetElement) {
            mousetrap = new Mousetrap(actionObject.targetElement);
          }

          if (actionObject.preventDefault === false) {
            preventDefault = false;
          }

          invokeAction(actionObject.action);
        } else {
          invokeAction(actionObject);
        }

        self.mousetraps.push(mousetrap);

      });

    }),

    unbindShortcuts: Ember.on(unbindEvent, function() {
      this.mousetraps.forEach(
        (mousetrap) => mousetrap.reset()
      );
    })

  });


}
