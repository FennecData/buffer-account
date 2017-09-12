import Hashtag from './Hashtag';
import hashtagStrategy from './hashtagStrategy';

const createHashtagPlugin = () => ({
  decorators: [
    {
      strategy: hashtagStrategy,
      component: Hashtag,
    },
  ],
});

export default createHashtagPlugin;
