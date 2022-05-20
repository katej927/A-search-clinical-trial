import { useState, ChangeEvent, FormEvent, KeyboardEvent, useRef } from 'react';
import { useDebounce } from 'hooks';
import { useQuery } from 'react-query';
import { getSearchResult } from 'services/search';

import SearchRecommendation from 'components/searchRecommendation';
import { BsSearch } from 'react-icons/bs';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [nameIdx, setNameIdx] = useState(-1);

  const ref = useRef<HTMLUListElement | null>(null);

  const [controller, setController] = useState<AbortController>();

  const { isLoading, data: searchResult } = useQuery(
    ['getDiseaseName', searchText],
    () => getSearchResult(searchText, controller),
    {
      enabled: !!searchText,
      refetchOnWindowFocus: false,
      staleTime: 6 * 10 * 1000,
      cacheTime: Infinity,
    }
  );

  const onInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (controller) {
      controller.abort();
    }
    setController(new AbortController());
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
      {searchText && (
        <SearchRecommendation searchResult={searchResult} isLoading={isLoading} nameIdx={nameIdx} ref={ref} />
      )}
    </div>
  );
};

export default SearchBar;
