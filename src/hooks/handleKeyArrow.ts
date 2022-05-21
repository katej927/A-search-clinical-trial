import { KeyboardEvent, Dispatch } from 'react';
import { IDiseaseItem } from 'types/disease';

export const handleKeyArrow = (
  e: KeyboardEvent,
  searchResult: IDiseaseItem[],
  setNameIdx: Dispatch<React.SetStateAction<number>>,
  handleSettingBeforeApi: (setSearchWordValue: string, setNameIdxValue?: number) => void,
  nameIdx: number
) => {
  if (!searchResult || !searchResult.length || e.nativeEvent.isComposing) return;

  switch (e.key) {
    case 'ArrowDown':
      setNameIdx((prevNum) => (searchResult.length === prevNum + 1 ? 0 : prevNum + 1));
      break;
    case 'ArrowUp':
      setNameIdx((prevNum) => (prevNum <= 0 ? searchResult.length - 1 : prevNum - 1));
      break;
    case 'Escape':
      handleSettingBeforeApi('', -1);
      break;
    case 'Enter':
      if (nameIdx === -1) break;
      console.log(`임상시험 명: ${searchResult[nameIdx].sickNm}`);
      break;
  }
};
