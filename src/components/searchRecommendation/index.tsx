import { forwardRef } from 'react';
import { IDiseaseItem } from 'types/disease';
import { NO_RESULT } from './texts';
import DiseaseItem from 'components/diseaseItem';

import styles from './searchRecommendation.module.scss';
import cn from 'classnames';
import { Loading } from 'components/loading';
import { sortWordList } from '../../utils/word';
import { useRecoilValue } from 'recoil';
import { searchWordState } from '../../states/disease';

interface Props {
  searchResult: IDiseaseItem[];
  isLoading: boolean;
}

const SearchRecommendation = forwardRef<HTMLDivElement | null, Props>(({ searchResult, isLoading }, ref) => {
  return (
    <div className={styles.recommendationWrapper} ref={ref}>
      <span className={styles.title}>추천 검색어</span>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <ul className={cn('resultWrapper')}>
          {searchResult?.length === 0 && <p className={styles.msg}>{NO_RESULT}</p>}
          {searchResult?.map((disease, idx) => (
            <DiseaseItem key={`${disease.sickNm}-${idx}`} disease={disease} idx={idx} />
          ))}
        </ul>
      )}
    </div>
  );
});

SearchRecommendation.displayName = 'SearchRecommendation';

export default SearchRecommendation;
