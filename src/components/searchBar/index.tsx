import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { keyDownIndexState, searchWordState } from 'states';
import { useState, KeyboardEvent, ChangeEvent, FormEvent, useEffect } from 'react';

import { BsSearch } from 'react-icons/bs';
import { useDebounce } from 'hooks';
import { handleKeyArrow } from 'utils';
import { getSearchResult, CLINICALTRIALSKOREA } from 'services';

import styles from './searchBar.module.scss';
import SearchRecommendation from 'components/searchRecommendation';

const SearchBar = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [nameIdx, setNameIdx] = useRecoilState(keyDownIndexState);

  const [controller, setController] = useState<AbortController>();
  const [dataFetchCount, setDataFetchCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchWord);

  const onSuccessDataFetch = () => {
    // eslint-disable-next-line no-console
    console.log(`API가 ${dataFetchCount}번 호출되었습니다!`);
    setDataFetchCount((prev) => prev + 1);
  };

  const { isLoading: isQueryLoading, data: searchResult } = useQuery(
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
    if (setSearchWordValue) setIsLoading(true);
    setSearchWord(setSearchWordValue);
  };

  useEffect(() => {
    if (!isQueryLoading) setIsLoading(false);
  }, [isQueryLoading]);

  const handleSearchWord = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) =>
    handleSettingBeforeApi(value.trim(), value === '' ? -1 : undefined, true);
  const handleKeyDown = (e: KeyboardEvent) => handleKeyArrow(e, searchResult, setNameIdx, handleSettingBeforeApi);
  const keyDownName = searchResult && nameIdx > -1 ? searchResult[nameIdx].sickNm : searchWord;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `${CLINICALTRIALSKOREA}${nameIdx > -1 ? searchResult[nameIdx].sickNm : searchWord}`;
  };

  return (
    <main className={styles.searchWrapper}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <BsSearch className={styles.reactIcons} />
        <input
          className={styles.searchInput}
          type='search'
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
    </main>
  );
};

export default SearchBar;
