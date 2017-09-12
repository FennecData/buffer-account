import deepFreeze from 'deep-freeze';
import americanEnglishTranslations from './translations/en-us.json';
import reducer, {
  actions,
  actionTypes,
} from './reducer';

describe('reducer', () => {
  it('should return initial state', () => {
    const stateAfter = {
      locale: 'en-US',
      translations: americanEnglishTranslations,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
  it('should handle SET_LOCALE action', () => {
    const locale = 'zh-CN';
    const stateBefore = {
      locale: 'en-US',
      translations: americanEnglishTranslations,
    };
    const stateAfter = {
      locale,
      translations: americanEnglishTranslations,
    };
    const action = {
      type: actionTypes.SET_LOCALE,
      locale,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('should handle SET_TRANSLATIONS action', () => {
    const translations = {
      test: 'yes',
    };
    const stateBefore = {
      locale: 'en-US',
      translations: americanEnglishTranslations,
    };
    const stateAfter = {
      locale: 'en-US',
      translations,
    };
    const action = {
      type: actionTypes.SET_TRANSLATIONS,
      translations,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  describe('actions', () => {
    it('should create a setLocale action', () => {
      const locale = 'en-US';
      const actionAfter = {
        type: actionTypes.SET_LOCALE,
        locale,
      };
      deepFreeze(actionAfter);
      expect(actions.setLocale({ locale }))
        .toEqual(actionAfter);
    });

    it('should create a setTranslations action', () => {
      const translations = {
        package: {
          sentence: 'hello!',
        },
      };
      const actionAfter = {
        type: actionTypes.SET_TRANSLATIONS,
        translations,
      };
      deepFreeze(actionAfter);
      expect(actions.setTranslations({ translations }))
        .toEqual(actionAfter);
    });
  });
});
