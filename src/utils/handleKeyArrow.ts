import { KeyboardEvent, Dispatch } from 'react';
import { IDiseaseItem } from 'types/disease';

export const handleKeyArrow = (
  e: KeyboardEvent,
  searchResult: IDiseaseItem[],
  setNameIdx: Dispatch<React.SetStateAction<number>>,
  handleSettingBeforeApi: () => void
  // nameIdx: number
) => {
  const {
    key,
    nativeEvent: { isComposing },
  } = e;
  if (!searchResult || !searchResult.length || isComposing) return;

  switch (key) {
    case 'ArrowDown':
      setNameIdx((prevNum) => (searchResult.length === prevNum + 1 ? 0 : prevNum + 1));
      break;
    case 'ArrowUp':
      setNameIdx((prevNum) => (prevNum <= 0 ? searchResult.length - 1 : prevNum - 1));
      break;
    case 'Escape':
      handleSettingBeforeApi();
      break;
    // case 'Enter':
    //   if (nameIdx === -1) break;
    //   console.log(`임상시험 명: ${searchResult[nameIdx].sickNm}`);
    //   break;
  }
};