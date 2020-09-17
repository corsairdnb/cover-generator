import { createSelector, Selector } from 'reselect';
import { RootState } from '../../store';
import { ContentState } from './types';

const contentSelector: Selector<RootState, ContentState> = (state) => state.content;

export const dateSelector = createSelector(contentSelector, (content) => content.date);
export const fontFamilySelector = createSelector(contentSelector, (content) => content.fontFamily);
export const timeSelector = createSelector(contentSelector, (content) => content.time);
export const artistSelector = createSelector(contentSelector, (content) => content.artist);
export const programSelector = createSelector(contentSelector, (content) => content.program);
export const imageSelector = createSelector(contentSelector, (content) => content.image);
