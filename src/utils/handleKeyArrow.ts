import { IDiseaseItem } from 'types/disease';
import { KeyboardEvent, Dispatch } from 'react';

export const handleKeyArrow = (
  e: KeyboardEvent,
  searchResult: IDiseaseItem[],
  setNameIdx: Dispatch<React.SetStateAction<number>>,
  handleSettingBeforeApi: (setSearchWordValue?: string, setNameIdxValue?: number) => void
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
  }
};
