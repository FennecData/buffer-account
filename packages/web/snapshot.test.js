// use story.js files as snapshots
import initStoryshots from '@storybook/addon-storyshots';

// polyfil console.group(end)

console.group = () => {}; // eslint-disable-line no-console
console.groupEnd = () => {}; // eslint-disable-line no-console

initStoryshots({
  suit: 'Snapshots',
});
