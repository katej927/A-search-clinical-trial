import { KeyboardEvent, Dispatch } from 'react';
import { IDiseaseItem } from 'types/disease';

export const useKeyArrow = (
  e: KeyboardEvent,
  searchResult: IDiseaseItem[],
  setNameIdx: Dispatch<React.SetStateAction<number>>
) => {
  if (searchResult.length <= 0) return;

  switch (e.key) {
    case '38':
      setNameIdx((prevNum) => prevNum + 1);
      break;
    case '40':
      setNameIdx((prevNum) => prevNum - 1);
      break;
  }
};
