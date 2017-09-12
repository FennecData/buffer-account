import React from 'react';
import { storiesOf } from '@storybook/react';
import Composer from './App';
import useCases from '../.storybook/mock-initial-props';

const stories = {
  create: 'Dashboard (create new)',
  edit: 'Dashboard (edit custom-time update)',
  editWithLinkAttachment: 'Dashboard (edit update w/ link attachment)',
  extension: 'Extension',
};

Object.keys(stories).forEach((useCase) => {
  storiesOf('Composer').add(stories[useCase], () => (
    <div>
      <Composer {...useCases[useCase]} />
    </div>
  ));
});
