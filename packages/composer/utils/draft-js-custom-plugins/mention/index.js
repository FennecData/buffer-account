import Mention from './Mention';
import mentionStrategy from './mentionStrategy';

const createMentionPlugin = () => ({
  decorators: [
    {
      strategy: mentionStrategy,
      component: Mention,
    },
  ],
});

export default createMentionPlugin;
