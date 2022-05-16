import { BsSearch } from 'react-icons/bs';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <form>
          <BsSearch className={styles.reactIcons} />
          <input type='text' placeholder='질환명을 입력해 주세요.' />
        </form>
        <button type='button'>검색</button>
      </div>
    </div>
  );
};

export default SearchBar;
