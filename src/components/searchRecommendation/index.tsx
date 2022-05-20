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
  nameIdx: number;
}

const SearchRecommendation = forwardRef<HTMLUListElement | null, Props>(({ searchResult, isLoading, nameIdx }, ref) => {
  const searchWord = useRecoilValue(searchWordState);
  return (
    <div className={styles.recommendationWrapper}>
      <span className={styles.title}>추천 검색어</span>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <ul className={cn('resultWrapper')} ref={ref}>
          {searchResult?.length === 0 && <p className={styles.msg}>{NO_RESULT}</p>}
          {sortWordList(searchWord, searchResult).map((disease, idx) => (
            <DiseaseItem key={`${disease.sickNm}-${idx}`} disease={disease} nameIdx={nameIdx} idx={idx} />
          ))}
        </ul>
      )}
    </div>
  );
});

SearchRecommendation.displayName = 'SearchRecommendation';

export default SearchRecommendation;
