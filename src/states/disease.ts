import { atom } from 'recoil';

export const searchWordState = atom<string>({
  key: '#searchWord',
  default: '',
});

export const keyDownIndexState = atom<number>({
  key: '#keyDownIndexState',
  default: -1,
});
