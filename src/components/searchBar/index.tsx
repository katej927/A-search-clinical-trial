import { useState, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { keyDownIndexState, searchWordState } from 'states';

import { BsSearch } from 'react-icons/bs';
import { getSearchResult, CLINICALTRIALSKOREA } from 'services';
import { useDebounce } from 'hooks';
import { handleKeyArrow } from 'utils';

import SearchRecommendation from 'components/searchRecommendation';
import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [nameIdx, setNameIdx] = useRecoilState(keyDownIndexState);

  const [controller, setController] = useState<AbortController>();
  const [dataFetchCount, setDataFetchCount] = useState(1);
  const [debounceTimer, setDebounceTimer] = useState(500);

  const debouncedSearch = useDebounce(searchWord, debounceTimer);

  const onSuccessDataFetch = () => {
    console.log(`API가 ${dataFetchCount}번 호출되었습니다!`);
    setDataFetchCount((prev) => prev + 1);
  };

  const { isLoading, data: searchResult } = useQuery(
    ['getDiseaseName', debouncedSearch],
    () => getSearchResult(debouncedSearch, controller),
    {
      enabled: !!debouncedSearch,
      staleTime: 6 * 10 * 1000,
      cacheTime: Infinity,
      onSuccess: () => onSuccessDataFetch(),
    }
  );

  const handleSettingBeforeApi = (setSearchWordValue = '', setNameIdxValue = -1, needCancelApi = false) => {
    if (needCancelApi) {
      if (controller) controller.abort();
      setController(new AbortController());
    }

    if (setNameIdxValue || setNameIdxValue === 0) setNameIdx(setNameIdxValue);
    setSearchWord(setSearchWordValue);
    if (debounceTimer === 0) setDebounceTimer(500);
  };

  const handleSearchWord = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    handleSettingBeforeApi(value.trim(), value === '' ? -1 : undefined, true);

  const handleKeyDown = (e: KeyboardEvent) => handleKeyArrow(e, searchResult, setNameIdx, handleSettingBeforeApi);

  const handleKeyDownName = (): string => {
    if (searchResult && nameIdx > -1) return searchResult[nameIdx].sickNm;
    return searchWord;
  };
  const keyDownName = handleKeyDownName();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDebounceTimer(0);
    if (nameIdx >= 0) {
      window.location.href = `${CLINICALTRIALSKOREA}${searchResult[nameIdx].sickNm}`;
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <BsSearch className={styles.reactIcons} />
        <input
          className={styles.searchInput}
          type='text'
          placeholder='질환명을 입력해 주세요.'
          onChange={handleSearchWord}
          onKeyDown={handleKeyDown}
          value={keyDownName}
        />
        <button className={styles.btn} type='submit'>
          검색
        </button>
      </form>
      {searchWord && <SearchRecommendation searchResult={searchResult} isLoading={isLoading} />}
    </div>
  );
};

export default SearchBar;
