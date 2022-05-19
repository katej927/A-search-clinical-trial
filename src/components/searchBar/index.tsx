import { useState, ChangeEvent, FormEvent, KeyboardEvent, useRef } from 'react';
import { useQuery } from 'react-query';
import { BsSearch } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import _ from 'lodash';

import { getDiseaseName } from 'services/search';
import { searchWordState } from 'states/disease';
import SearchRecommendation from 'components/searchRecommendation';
import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [nameIdx, setNameIdx] = useState(-1);
  const ref = useRef<HTMLUListElement | null>(null);

  const { isLoading, data: searchResult } = useQuery(['getDiseaseName', searchWord], () => getDiseaseName(searchWord), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const debouncedValue = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  }, 500);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchResult) return;

    switch (e.key) {
      case 'ArrowDown':
        setNameIdx((prevNum) => prevNum + 1);
        if (ref.current?.childElementCount === nameIdx + 1) setNameIdx(0);
        break;
      case 'ArrowUp':
        if (nameIdx === -1 && searchResult) setNameIdx(searchResult.length);
        setNameIdx((prevNum) => prevNum - 1);
        break;
      case 'Escape':
        setSearchWord('');
        setNameIdx(-1);
        break;
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchBar} onSubmit={onFormSubmit}>
        <BsSearch className={styles.reactIcons} />
        <input
          className={styles.searchInput}
          type='text'
          placeholder='질환명을 입력해 주세요.'
          onChange={debouncedValue}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.btn} type='submit'>
          검색
        </button>
      </form>
      {searchWord && (
        <SearchRecommendation searchResult={searchResult} isLoading={isLoading} nameIdx={nameIdx} ref={ref} />
      )}
    </div>
  );
};

export default SearchBar;
