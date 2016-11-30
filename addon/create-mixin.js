/* global Mousetrap */

import Ember from 'ember';

export default function(bindEvent, unbindEvent) {

  return Ember.Mixin.create({
    mousetraps:[],
    bindShortcuts: Ember.on(bindEvent, function() {
      var self = this;
      var shortcuts = this.get('keyboardShortcuts');

      if (Ember.typeOf(shortcuts) !== 'object') { return; }

      this.mousetraps = [];

      Object.keys(shortcuts).forEach(function(shortcut) {
        var actionObject   = shortcuts[shortcut];
        var mousetrap      = new Mousetrap(document.body);
        var preventDefault = true;

        function invokeAction(action, eventType) {
          var type = Ember.typeOf(action);

          if (type === 'string') {
            mousetrap.bind(shortcut, function(){
              self.send(action);
              return preventDefault !== true;
            }, eventType);
          }
          else if (type === 'function') {
            mousetrap.bind(shortcut, action.bind(self), eventType);
          }
          else {
            throw new Error('Invalid value for keyboard shortcut: ' + action);
          }
        }

        if (Ember.typeOf(actionObject) === 'object') {
          if (actionObject.global === false) {
            mousetrap = new Mousetrap(document);
          } else if (actionObject.scoped) {
            if (Ember.typeOf(actionObject.scoped) === 'boolean') {
              mousetrap = new Mousetrap(self.get('element'));
            } else if (Ember.typeOf(actionObject.scoped) === 'string') {
              mousetrap = new Mousetrap(document.querySelector(actionObject.scoped));
            }
          } else if (actionObject.targetElement) {
            mousetrap = new Mousetrap(actionObject.targetElement);
          }

          if (actionObject.preventDefault === false) {
            preventDefault = false;
          }

          invokeAction(actionObject.action, actionObject.eventType);
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
