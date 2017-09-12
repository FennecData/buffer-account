import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Settings, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import ProfileSettings from './components/ProfileSettings';
import {
  settingsHeader,
  days,
  timezones,
} from './components/ProfileSettings/settingsData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Settings', () => {
  it('should render', () => {
    const store = storeFake({
      settings: {
        loading: false,
        settingsHeader,
        days,
        profileTimezone: 'Europe/London',
        hasTwentyFourHourTimeFormat: false,
        items: timezones,
      },
      i18n: {
        translations: {
          example: {
            loggedIn: 'Logged In...',
            loggedOut: 'Logged Out...',
          },
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    expect(wrapper.find(ProfileSettings).length)
      .toBe(1);
  });

  it('should export reducer', () => {
    expect(reducer)
      .toBeDefined();
  });

  it('should export actions', () => {
    expect(actions)
      .toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
});
