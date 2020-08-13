// TODO: this props should be provided at application start as json file

import { InitialPreset } from './types';

export const initialPreset: InitialPreset = {
  assets: [
    {
      left: 100,
      right: 0,
      top: 0,
      bottom: 50,
      maxWidth: 200
    }
  ],
  labels: [
    {
      text: 'Hello world',
      left: 100,
      right: 0,
      bottom: 0,
      top: 100,
      maxWidth: 1000,
      fontSize: 100
    }
  ]
};
