/* global Mousetrap */
import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
import { typeOf } from '@ember/utils';

export default function(bindEvent, unbindEvent) {
  return Mixin.create({
    mousetraps: [],
    bindShortcuts: on(bindEvent, function() {
      const shortcuts = this.get('keyboardShortcuts');
      const self = this;
      if (typeOf(shortcuts) !== 'object') {
        return;
      }

      this.mousetraps = [];

      Object.keys(shortcuts).forEach(function(shortcut) {
        const actionObject = shortcuts[shortcut];
        let mousetrap;
        let preventDefault = true;

        function invokeAction(action, eventType) {
          var type = typeOf(action);
          var callback;
          if (type === 'string') {
            callback = function() {
              self.send(action);
              return preventDefault !== true;
            };
          } else if (type === 'function') {
            callback = action.bind(self);
          } else {
            throw new Error('Invalid value for keyboard shortcut: ' + action);
          }
          mousetrap.bind(shortcut, callback, eventType);
        }

        if (typeOf(actionObject) === 'object') {
          if (actionObject.global === false) {
            mousetrap = new Mousetrap(document);
          } else if (actionObject.scoped) {
            if (typeOf(actionObject.scoped) === 'boolean') {
              mousetrap = new Mousetrap(this.get('element'));
            } else if (typeOf(actionObject.scoped) === 'string') {
              mousetrap = new Mousetrap(
                document.querySelector(actionObject.scoped)
              );
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

    unbindShortcuts: on(unbindEvent, function() {
      const _removeEvent = (object, type, callback) => {
        if (object.removeEventListener) {
          object.removeEventListener(type, callback, false);
          return;
        }
        object.detachEvent('on' + type, callback);
      };
      this.mousetraps.forEach(mousetrap => {
        // manually unbind JS event
        _removeEvent(mousetrap.target, 'keypress', mousetrap._handleKeyEvent);
        _removeEvent(mousetrap.target, 'keydown', mousetrap._handleKeyEvent);
        _removeEvent(mousetrap.target, 'keyup', mousetrap._handleKeyEvent);
        mousetrap.reset();
      });
      this.mousetraps = [];
    })
  });
}
