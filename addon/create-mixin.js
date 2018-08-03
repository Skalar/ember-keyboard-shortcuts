import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
import { initializeKeyboardShortcuts, destroyKeyboardShortcuts } from './index';

export default function(bindEvent, unbindEvent) {
  return Mixin.create({
    bindShortcuts: on(bindEvent, function() {
      initializeKeyboardShortcuts(this);
    }),

    unbindShortcuts: on(unbindEvent, function() {
      destroyKeyboardShortcuts(this);
    })
  });
}
