import { useState, ChangeEvent, FormEvent, KeyboardEvent, useRef } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { keyDownIndexState } from 'states';
import { getSearchResult } from 'services/search';

import SearchRecommendation from 'components/searchRecommendation';
import { BsSearch } from 'react-icons/bs';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [nameIdx, setNameIdx] = useRecoilState(keyDownIndexState);

  const ref = useRef<HTMLUListElement | null>(null);

  const { isLoading, data: searchResult } = useQuery(
    ['getDiseaseName', searchText],
    () => getSearchResult(searchText),
    {
      enabled: !!searchText,
      refetchOnWindowFocus: false,
      staleTime: 6 * 10 * 1000,
      cacheTime: Infinity,
    }
  );

  const onInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchResult || !searchResult.length) return;

    console.log('handleKeyDown', nameIdx);
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
        setSearchText('');
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
          value={searchText}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.btn} type='submit'>
          검색
        </button>
      </form>
      {searchText && <SearchRecommendation searchResult={searchResult} isLoading={isLoading} ref={ref} />}
    </div>
  );
};

export default SearchBar;
