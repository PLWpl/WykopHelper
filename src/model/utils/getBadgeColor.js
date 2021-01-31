import { getLocalStorage } from '../../utils/handleLocalStorage';

const settings = getLocalStorage('settings');

export const defaultColor = settings.BADGE.DEFAULT_COLOR;