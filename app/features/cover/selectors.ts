import { createSelector, Selector } from 'reselect';
import { RootState } from '../../store';
import { ContentState } from './types';

const contentSelector: Selector<RootState, ContentState> = (state) => state.content;

export const dateSelector = createSelector(contentSelector, (content) => content.date);
export const fontFamilySelector = createSelector(contentSelector, (content) => content.fontFamily);
