/* global Mousetrap */

import Ember from 'ember';

export default function(bindEvent, unbindEvent) {

  return Ember.Mixin.create({
    mousetraps:[],
    bindShortcuts: Ember.on(bindEvent, function() {
      const shortcuts = this.get('keyboardShortcuts');

      if (Ember.typeOf(shortcuts) !== 'object') {
        return;
      }

      this.mousetraps = [];

      Object.keys(shortcuts).forEach((shortcut) => {
        const actionObject   = shortcuts[shortcut];
        let mousetrap;
        let preventDefault = true;

        const invokeAction = (action, eventType) => {
          const type = Ember.typeOf(action);
          let   callback;
          if (type === 'string') {
            callback = function(){
              this.send(action);
              return preventDefault !== true;
            }
          }
          else if (type === 'function') {
            callback = action.bind(this)
          }
          else {
            throw new Error('Invalid value for keyboard shortcut: ' + action);
          }
          mousetrap.bind(shortcut, callback, eventType);
        }

        if (Ember.typeOf(actionObject) === 'object') {
          if (actionObject.global === false) {
            mousetrap = new Mousetrap(document.body);
          } else if (actionObject.scoped) {
            if (Ember.typeOf(actionObject.scoped) === 'boolean') {
              mousetrap = new Mousetrap(this.get('element'));
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
          mousetrap = new Mousetrap(document.body);
          invokeAction(actionObject);
        }
        this.mousetraps.push(mousetrap);
      });

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
