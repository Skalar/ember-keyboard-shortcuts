# ember-keyboard-shortcuts

## Installation

In your ember-cli project:

```bash
ember install ember-keyboard-shortcuts
```

## Usage

We expose two functions to setup and remove keyboard shortcuts. You can use it
in routes, components or controllers.

### In a route

```javascript
import Route from '@ember/routing/route';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default Route.extend({
  keyboardShortcuts: {
    // trigger 'cancel' action when esc is pressed
    esc: 'cancel',
    'ctrl+c': {
      action: 'myAction', // action to trigger
      global: false, // whether to trigger inside input (default: true)
      preventDefault: true // (default: true)rue
    },

    // trigger function when tab is pressed
    tab() {
      console.log('Tab pressed');
      return false; // preventDefault
    }
  },

  activate() {
    bindKeyboardShortcuts(this);
  },

  deactivate() {
    unbindKeyboardShortcuts(this);
  },

  actions: {
    cancel() {
      this.transitionTo('posts');
    }
  }
});
```

### In a component

```javascript
import Component from '@ember/component';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default Component.extend({
  keyboardShortcuts: {
    f: {
      action: 'myAction', // action to trigger
      global: false, // whether to trigger inside input (default: true)
      preventDefault: true // (default: true)
    }
  },

  didInsertElement() {
    this._super(...arguments);
    bindKeyboardShortcuts(this);
  },

  willDestroyElement() {
    this._super(...arguments);
    unbindKeyboardShortcuts(this);
  },

  actions: {
    myAction() {
      alert('key `f` was pressed from component some-component');
    }
  }
});
```

## Available shortcut options

- `action`: action to trigger. Can be a function or a string containing action name.
- `global`: indicates whether events should be triggered within `input`, `textarea` and `select`. Default: `true`.
- `scoped`: indicates that the shortcuts should only be registered for the current component/view and its children. Implies `global: true`. Default: `false`.
- `preventDefault`: prevents the default action and stops the event from bubbling up. Applies only when the `action` is a string. Default: `true`.

## Migrating from mixins

Prior versions, you could use this addon with mixins. We have deprecated that
behavior in order to calling specific functions to setup shortcuts as well to
destroy event listeners.

Here is an example of not using mixins in a route.

```js
import Route from '@ember/routing/route';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts
} from 'ember-keyboard-shortcuts';

export default Ember.Route.extend({
  // No changes required in this block
  keyboardShortcuts: {
    esc: 'cancel',
    'ctrl+c': {
      action: 'cancel',
      global: false,
      preventDefault: true
    },
    tab() {
      console.log('Tab pressed');
      return false;
    }
  },

  activate() {
    bindKeyboardShortcuts(this);
  },

  deactivate() {
    unbindKeyboardShortcuts(this);
  },

  actions: {
    cancel() {
      this.transitionTo('posts');
    }
  }
});
```

In summary, if you used to use `ember-keyboard-shortcuts` in routes, you will
add a function call `activate` and `deactivate`.

To migrate from a components or a view, you should use `didInsertElement` and
`willDestroyElement` hooks.

## Development

### Installation

- `git clone` this repository
- `npm install`

### Running

- `ember server`
- Visit your app at http://localhost:4200.

### Running Tests

- `ember test`
- `ember test --server`

### Building

- `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
