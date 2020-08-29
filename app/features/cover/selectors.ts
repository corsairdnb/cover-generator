import { createSelector, Selector } from 'reselect';
import { RootState } from '../../store';
import { Content } from './types';

const contentSelector: Selector<RootState, Content> = (state) => state.content;

export const dateSelector = createSelector(contentSelector, (content) => content.date);
export const fontFamilySelector = createSelector(contentSelector, (content) => content.fontFamily);
