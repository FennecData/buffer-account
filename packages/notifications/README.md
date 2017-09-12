# @bufferapp/notifications

Create a notification that disappears after 5 seconds or when the user closes it.

## Setup

### Add Reducer And Middlware To Store

```js
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { middleware, reducer } from '@bufferapp/notifications';

const store = createStore(
  combineReducers({
    notifications: reducer, // add notifications reducer under the `notifications` state tree
  }),
  {/* initial state */},
  applyMiddleware(middleware),
);
```

### Add Notifications Within The React Redux Provider

```js
import { Provider } from 'react-redux';
import Notifications from '@bufferapp/notifications';

<Provider store={store}>
  <Notifications />
</Provider>
```

## API

### createNotification

**notificationType** _string_ the type of notification to display, `success` or `error` controls the icon

**message** _string_ the message to display on the notification

```js

import { actions } from '@bufferapp/notifications';

// dispatch the createNotification action with the redux store

store.dispatch(actions.createNotification({
  notificationType: 'success',
  message: 'Hooray! A notification appears!',
}));
```
