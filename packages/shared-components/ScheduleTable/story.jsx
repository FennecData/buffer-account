import React from 'react';
import {
  action,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ScheduleTable from './index';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const times = [
  {
    value: {
      hours: 9,
      minutes: 41,
    },
    onChange: action('on-change'),
    onRemoveTimeClick: action('on-remove-time-click'),
  },
  {
    value: {
      hours: 19,
      minutes: 0,
    },
    onChange: action('on-change'),
    onRemoveTimeClick: action('on-remove-time-click'),
  },
];
const singleTime = [
  {
    value: {
      hours: 9,
      minutes: 41,
    },
    onChange: action('on-change'),
    onRemoveTimeClick: action('on-remove-time-click'),
  },
];
const noTimes = [];

const days = [];
const daysSingleTime = [];
const daysNoTimes = [];

daysOfWeek.forEach((dayName) => {
  days.push({
    dayName,
    postingTimesTotal: times.length,
    times,
  });
  daysSingleTime.push({
    dayName,
    postingTimesTotal: singleTime.length,
    times: singleTime,
  });
  daysNoTimes.push({
    dayName,
    postingTimesTotal: noTimes.length,
    times: noTimes,
  });
});

storiesOf('ScheduleTable')
  .addDecorator(checkA11y)
  .add('default', () => (
    <ScheduleTable
      days={days}
    />
  ))
  .add('disabled', () => (
    <ScheduleTable
      days={days}
      disabled
    />
  ))
  .add('24-hour time setting', () => (
    <ScheduleTable
      days={days}
      select24Hours
    />
  ))
  .add('24-hour time setting, disabled', () => (
    <ScheduleTable
      days={days}
      disabled
      select24Hours
    />
  ))
  .add('single time', () => (
    <ScheduleTable
      days={daysSingleTime}
    />
  ))
  .add('no times', () => (
    <ScheduleTable
      days={daysNoTimes}
    />
  ));
