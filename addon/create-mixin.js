/* global Mousetrap */

import Ember from 'ember';

export default function(bindEvent, unbindEvent) {

  return Ember.Mixin.create({
    mousetraps:[],
    bindShortcuts: Ember.on(bindEvent, function() {
      const shortcuts = this.get('keyboardShortcuts');
      const self = this;
      if (Ember.typeOf(shortcuts) !== 'object') { return; }

      this.mousetraps = [];

      Object.keys(shortcuts).forEach(function(shortcut) {
        const actionObject   = shortcuts[shortcut];
        let mousetrap;
        let preventDefault = true;

        function invokeAction(action, eventType) {
          var type = Ember.typeOf(action);
          var callback;
          if (type === 'string') {
            callback = function(){
              self.send(action);
              return preventDefault !== true;
            }
          }
          else if (type === 'function') {
            callback = action.bind(self)
          }
          else {
            throw new Error('Invalid value for keyboard shortcut: ' + action);
          }
          mousetrap.bind(shortcut, callback, eventType);
        }

        if (Ember.typeOf(actionObject) === 'object') {
          if (actionObject.global === false) {
            mousetrap = new Mousetrap(document);
          } else if (actionObject.scoped) {
            if (Ember.typeOf(actionObject.scoped) === 'boolean') {
              mousetrap = new Mousetrap(this.get('element'));
            } else if (Ember.typeOf(actionObject.scoped) === 'string') {
              mousetrap = new Mousetrap(document.querySelector(actionObject.scoped));
            }
          } else if (actionObject.targetElement) {
            mousetrap = new Mousetrap(actionObject.targetElement);
          } else {
            mousetrap = new Mousetrap(document.body);
          }

          if (actionObject.preventDefault === false) {
            preventDefault = false;
          }

          invokeAction(actionObject.action, actionObject.eventType);
        } else {
          mousetrap = new Mousetrap(document.body);
          invokeAction(actionObject);
        }
        self.mousetraps.push(mousetrap);
      }, this);

    }),

    unbindShortcuts: Ember.on(unbindEvent, function() {
      const _removeEvent = (object, type, callback) => {
        if (object.removeEventListener) {
          object.removeEventListener(type, callback, false);
          return;
        }
        object.detachEvent('on' + type, callback);
      }
      this.mousetraps.forEach(
        (mousetrap) => {
          // manually unbind JS event
          _removeEvent(mousetrap.target, 'keypress', mousetrap._handleKeyEvent);
          _removeEvent(mousetrap.target, 'keydown', mousetrap._handleKeyEvent);
          _removeEvent(mousetrap.target, 'keyup', mousetrap._handleKeyEvent);
          mousetrap.reset()
        }
      );
      this.mousetraps = []
    })

  });


}
