// TODO: this props should be provided at application start as json file

import { InitialPreset, Program } from './types';

export const initialPreset: InitialPreset = {
  assets: [
    {
      id: '11thradio',
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
      fontSize: 100,
      id: 'test',
      textAfter: '',
      color: '#ff0'
    }
  ]
};

export const programs: { [key: string]: Program } = {
  '2deep': {
    name: '2deep',
    color: '#3671ff'
  },
  'audio': {
    name: 'Audio plants',
    color: '#36ff39'
  },
  'bass': {
    name: 'Bass addiction',
    color: '#fff536'
  },
  'boombap': {
    name: 'Boombap masters',
    color: '#ff3636'
  },
  'boom': {
    name: 'Boom selecta',
    color: '#3671ff'
  },
  'breakpoint': {
    name: 'Breakpoint',
    color: '#3671ff'
  },
  'citate': {
    name: 'Citate forms',
    color: '#3671ff'
  },
  'codered': {
    name: 'Codered',
    color: '#3671ff'
  },
  'drop': {
    name: 'Drop dealerz',
    color: '#3671ff'
  },
  'fat': {
    name: 'Fat vibez',
    color: '#3671ff'
  },
  'hybrid': {
    name: 'Hybrid funk system',
    color: '#3671ff'
  },
  'ibwt': {
    name: 'In beat we trust',
    color: '#3671ff'
  },
  'integration': {
    name: 'Integration',
    color: '#3671ff'
  },
  'kitchen': {
    name: 'Kitchen of drums',
    color: '#3671ff'
  },
  'neurosphere': {
    name: 'Neurosphere',
    color: '#3671ff'
  },
  'new': {
    name: 'Новые формы',
    color: '#3671ff'
  },
  'nuke': {
    name: 'Nuke lab',
    color: '#3671ff'
  },
  'province': {
    name: 'Province',
    color: '#3671ff'
  },
  'pulse': {
    name: 'Pulse',
    color: '#3671ff'
  },
  'rampa': {
    name: 'Rampa trash',
    color: '#3671ff'
  },
  'resense': {
    name: 'Resense',
    color: '#3671ff'
  },
  'sorry': {
    name: 'Sorry not sorry',
    color: '#3671ff'
  },
  'stratosphere': {
    name: 'Stratosphere',
    color: '#3671ff'
  },
  'technology': {
    name: 'Технология прошлого',
    color: '#3671ff'
  },
  'ton': {
    name: 'Time of night',
    color: '#3671ff'
  },
  'urban': {
    name: 'Urban wave',
    color: '#3671ff'
  },
  'vibe': {
    name: 'Vide',
    color: '#3671ff'
  },
  'welovednb': {
    name: '#WeLoveDrumAndBass',
    color: '#3671ff'
  },
  'wicked': {
    name: 'Wicked wicked',
    color: '#3671ff'
  },
  'wickedsound': {
    name: 'Wicked sound',
    color: '#3671ff'
  },
  'xtra': {
    name: 'Xtra',
    color: '#3671ff'
  }
};
