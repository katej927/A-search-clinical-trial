import { useState, FormEvent, KeyboardEvent, useRef, ChangeEvent } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { keyDownIndexState } from 'states';
import { BsSearch } from 'react-icons/bs';
import { getSearchResult } from 'services/search';
import { searchWordState } from 'states/disease';
import useDebounce from 'hooks/useDebounce';

import SearchRecommendation from 'components/searchRecommendation';
import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [nameIdx, setNameIdx] = useRecoilState(keyDownIndexState);
  const ref = useRef<HTMLUListElement | null>(null);

  const [controller, setController] = useState<AbortController>();
  const debouncedSearch = useDebounce(searchWord, 500);

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

  const handleSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
    if (controller) {
      controller.abort();
    }
    setController(new AbortController());
    setSearchWord(e.currentTarget.value.trim());
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log('handleKeyDown 내부로 들어옴');
    if (!searchResult || !searchResult.length) return;

    console.log('handleKeyDown 리턴 지나고 nameIdx', nameIdx);
    switch (e.key) {
      case 'ArrowDown':
        if (ref.current?.childElementCount === nameIdx + 1) setNameIdx(0);
        else setNameIdx((prevNum) => prevNum + 1);
        break;
      case 'ArrowUp':
        if (nameIdx === 0 && searchResult) setNameIdx(searchResult.length);
        setNameIdx((prevNum) => prevNum - 1);
        break;
      case 'Escape':
        setSearchWord('');
        setNameIdx(-1);
        break;
    }
  };

  console.log('searchResult', searchResult, 'nameIdx', nameIdx);

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchBar} onSubmit={onFormSubmit}>
        <BsSearch className={styles.reactIcons} />
        <input
          className={styles.searchInput}
          type='text'
          placeholder='질환명을 입력해 주세요.'
          onChange={handleSearchWord}
          onKeyDown={handleKeyDown}
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
