import { useState, KeyboardEvent, useRef, ChangeEvent, FormEvent } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { keyDownIndexState, searchWordState } from 'states';

import { BsSearch } from 'react-icons/bs';
import { getSearchResult } from 'services';
import { useDebounce } from 'hooks';
import { handleKeyArrow } from 'utils';

import SearchRecommendation from 'components/searchRecommendation';
import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [nameIdx, setNameIdx] = useRecoilState(keyDownIndexState);

  const [controller, setController] = useState<AbortController>();
  const [debounceTimer, setDebounceTimer] = useState(500);
  const [dataFetchCount, setDataFetchCount] = useState(1);
  const debouncedSearch = useDebounce(searchWord, debounceTimer);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSettingBeforeApi = (setSearchWordValue = '', setNameIdxValue = -1, needCancelApi = false) => {
    if (needCancelApi) {
      if (controller) controller.abort();
      setController(new AbortController());
    }

    setSearchWord(setSearchWordValue);
    if (setNameIdxValue) setNameIdx(setNameIdxValue);
    if (debounceTimer === 0) setDebounceTimer(500);
  };

  const onSuccessDataFetch = () => {
    console.log(`API가 ${dataFetchCount}번 호출되었습니다!`);
    setDataFetchCount((prev) => prev + 1);
  };

  const { isLoading, data: searchResult } = useQuery(
    ['getDiseaseName', debouncedSearch],
    () => getSearchResult(debouncedSearch, controller),
    {
      enabled: !!debouncedSearch,
      refetchOnWindowFocus: false,
      staleTime: 6 * 10 * 1000,
      cacheTime: Infinity,
      onSuccess: () => onSuccessDataFetch(),
      // onSuccess: () => console.log('하이'),
    }
  );

  const handleSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    handleSettingBeforeApi(value.trim(), value === '' ? -1 : undefined, true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDebounceTimer(0);
  };

  const handleKeyDown = (e: KeyboardEvent) =>
    // handleKeyArrow(e, searchResult, setNameIdx, handleSettingBeforeApi, nameIdx);
    handleKeyArrow(e, searchResult, setNameIdx, handleSettingBeforeApi);

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
          value={searchWord}
        />
        <button className={styles.btn} type='submit'>
          검색
        </button>
      </form>
      {searchWord && <SearchRecommendation searchResult={searchResult} isLoading={isLoading} ref={ref} />}
    </div>
  );
};

export default SearchBar;
