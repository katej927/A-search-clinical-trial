import { IDiseaseItem } from '../../types/disease.d';

export const sortWordList = (searchText: string, wordList?: IDiseaseItem[]): IDiseaseItem[] => {
  if (!wordList) return [];
  return wordList.sort((a, b) => {
    const aIndex = a.sickNm.indexOf(searchText);
    const bIndex = b.sickNm.indexOf(searchText);
    if (aIndex > bIndex) return 1;
    if (aIndex === bIndex) {
      if (a.sickNm.length > b.sickNm.length) return 1;
      if (a.sickNm > b.sickNm) return 1;
    }
    return -1;
  });
};
