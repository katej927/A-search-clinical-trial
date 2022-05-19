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
      <ul className={cn('resultWrapper')} ref={ref}>
        {!searchResult && <li>{isLoading ? LOADING_TEXT : NO_RESULT}</li>}
        {searchResult?.map((disease, idx) => {
          const { sickNm } = disease;
          const key = `${disease.sickNm}-${idx}`;
          return (
            <li key={key} className={cx(styles.diseaseWrapper, { [styles.highlight]: nameIdx === idx })}>
              <BsSearch className={styles.reactIcons} />
              <span className={styles.searchWord}>{sickNm}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

SearchRecommendation.displayName = 'SearchRecommendation';

export default SearchRecommendation;
