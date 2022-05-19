import { atom } from 'recoil';

export const searchWordState = atom<any>({
  key: '#searchWord',
  default: '',
});
