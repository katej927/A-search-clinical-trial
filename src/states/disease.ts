import { atom } from 'recoil';

export const searchWordState = atom<string>({
  key: '#searchWord',
  default: '',
});
