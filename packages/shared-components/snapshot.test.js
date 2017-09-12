// use story.js files as snapshots
import initStoryshots, {
  shallowSnapshot,
} from '@storybook/addon-storyshots';

initStoryshots({
  suit: 'Snapshots',
  test: shallowSnapshot,
});
