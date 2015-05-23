# ember-keyboard-shortcuts

## Installation

In your ember-cli project:

```bash
ember install ember-keyboard-shortcuts
```

## Usage

### In a route

```javascript
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/route';

export default Ember.Route.extend(
  KeyboardShortcuts,

  {
    actions: {
      cancel: function() {
        this.transitionTo('posts');
      }
    },

    keyboardShortcuts: {
      // trigger 'cancel' action when esc is pressed
      'esc' : 'cancel',

      'ctrl+c' : {
        action         : 'cancel', // action to trigger
        global         : false,    // whether to trigger inside input (default: true)  
        preventDefault : true     // (default: true)
      }

      // trigger function when tab is pressed
      tab : function() {
        console.log('Tab pressed');
        return false; // preventDefault
      }
    }
  }
);
```

### In a component
```javascript
import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(
  KeyboardShortcuts,

  {
    keyboardShortcuts: {
      'esc'    : 'cancel',
      'ctrl+s' : 'save'
    }
  }
);
```


### In a view
```javascript
import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/view';

export default Ember.View.extend(
  KeyboardShortcuts,

  {
    keyboardShortcuts: {
      'esc'    : 'cancel',
      'ctrl+s' : 'save'
    }
  }
);
```

## Available shortcut options

* `action`: action to trigger. Can be a function or a string containing action name.
* `global`: indicates whether events should be triggered within `input`, `textarea` and `select`. Default: `true`.
* `scoped`: indicates that the shortcuts should only be registered for the current component/view and its children. Implies `global: true`. Default: `false`.
* `preventDefault`: prevents the default action and stops the event from bubbling up. Applies only when the `action` is a string. Default: `false`.

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
