import { useState, ChangeEvent, FormEvent, useEffect, KeyboardEvent, useRef } from 'react';
import { useKeyArrow, useDebounce } from 'hooks';
import { useQuery } from 'react-query';
import { getSearchResult } from 'services/search';

import SearchRecommendation from 'components/searchRecommendation';
import { BsSearch } from 'react-icons/bs';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [nameIdx, setNameIdx] = useState(-1);

  const ref = useRef<HTMLUListElement | null>(null);

  // const debouncedValue = useDebounce(searchText); // lodash 로 수정

  const { isLoading, data: searchResult } = useQuery(
    ['getDiseaseName', searchText],
    () => getSearchResult(searchText),
    {
      enabled: !!searchText,
      // keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const onInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value);
  };

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
        setSearchText('');
        setNameIdx(-1);
        break;
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <form className={styles.searchBar} onSubmit={onFormSubmit}>
        <BsSearch className={styles.reactIcons} />
        <input
          type='search'
          placeholder='질환명을 입력해 주세요.'
          value={searchText}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
        />
        <button type='submit'>검색</button>
      </form>
      <SearchRecommendation searchResult={searchResult} isLoading={isLoading} nameIdx={nameIdx} ref={ref} />
    </div>
  );
};

export default SearchBar;
