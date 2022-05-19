import { forwardRef } from 'react';
import { IDiseaseItem } from 'types/disease';
import { NO_RESULT, LOADING_TEXT } from './texts';
import { BsSearch } from 'react-icons/bs';

import styles from './searchRecommendation.module.scss';
import cn from 'classnames';

const cx = cn.bind(styles);

interface Props {
  searchResult: IDiseaseItem[] | undefined;
  isLoading: boolean;
  nameIdx: number;
}

const SearchRecommendation = forwardRef<HTMLUListElement | null, Props>(({ searchResult, isLoading, nameIdx }, ref) => {
  return (
    <div className={styles.recommendationWrapper}>
      <span className={styles.title}>추천 검색어</span>
      <ul className={cn('resultWrapper')} ref={ref}>
        {!searchResult && <li className={styles.msg}>{isLoading ? LOADING_TEXT : NO_RESULT}</li>}
        {searchResult?.map((disease, idx) => {
          const { sickNm } = disease;
          const key = `${disease.sickNm}-${idx}`;
          return (
            <li key={key} className={styles.diseaseWrapper}>
              <BsSearch className={styles.reactIcons} />
              <span className={cx(styles.searchWord, { [styles.highlight]: nameIdx === idx })}>{sickNm}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

SearchRecommendation.displayName = 'SearchRecommendation';

export default SearchRecommendation;
