import { useState, KeyboardEvent, useRef, ChangeEvent, FormEvent } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { useClickAway } from 'react-use';
import { keyDownIndexState, searchWordState } from 'states';

import { BsSearch } from 'react-icons/bs';
import { getSearchResult } from 'services/search';
import { useDebounce, handleKeyArrow } from 'hooks';

import SearchRecommendation from 'components/searchRecommendation';
import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [nameIdx, setNameIdx] = useRecoilState(keyDownIndexState);

  const [controller, setController] = useState<AbortController>();
  const [debounceTime, setDebounce] = useState(500);
  const debouncedSearch = useDebounce(searchWord, debounceTime);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSettingBeforeApi = (setSearchWordValue: string, setNameIdxValue?: number) => {
    if (controller) controller.abort();
    setController(new AbortController());
    setSearchWord(setSearchWordValue);
    if (debounceTime === 0) setDebounce(500);
    if (setNameIdxValue) setNameIdx(setNameIdxValue);
  };

  const { isLoading, data: searchResult } = useQuery(
    ['getDiseaseName', debouncedSearch],
    () => getSearchResult(debouncedSearch, controller),
    {
      enabled: !!debouncedSearch,
      refetchOnWindowFocus: false,
      staleTime: 6 * 10 * 1000,
      cacheTime: Infinity,
    }
  );

  useClickAway(ref, () => {
    if (!isLoading) handleSettingBeforeApi('', -1);
  });

  const handleSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    handleSettingBeforeApi(value.trim(), value === '' ? -1 : undefined);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDebounce(0);
  };

  const handleKeyDown = (e: KeyboardEvent) =>
    handleKeyArrow(e, searchResult, setNameIdx, handleSettingBeforeApi, nameIdx);

  console.log('debounceTime', debounceTime);

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
