import { BsSearch } from 'react-icons/bs';

import styles from './searchRecommendation.module.scss';

const SearchRecommendation = () => {
  return (
    <div className={styles.recommendationWrapper}>
      <ul>
        <li>
          <span>
            <BsSearch className={styles.reactIcons} />
          </span>
          <span className={styles.searchWord}>검색어1</span>
        </li>
        <li>
          <span>
            <BsSearch className={styles.reactIcons} />
          </span>
          <span className={styles.searchWord}>검색어2</span>
        </li>
        <li>
          <span>
            <BsSearch className={styles.reactIcons} />
          </span>
          <span className={styles.searchWord}>검색어3</span>
        </li>
      </ul>
    </div>
  );
};

export default SearchRecommendation;
