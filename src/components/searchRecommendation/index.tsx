import { forwardRef } from 'react';
import { IDiseaseItem } from 'types/disease';
import { NO_RESULT, LOADING_TEXT } from './texts';
import DiseaseItem from 'components/diseaseItem';

import styles from './searchRecommendation.module.scss';
import cn from 'classnames';
import { Loading } from 'components/loading';

interface Props {
  searchResult: IDiseaseItem[] | undefined;
  isLoading: boolean;
  nameIdx: number;
}

const SearchRecommendation = forwardRef<HTMLUListElement | null, Props>(({ searchResult, isLoading, nameIdx }, ref) => {
  return (
    <div className={styles.recommendationWrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className={cn('resultWrapper')} ref={ref}>
          {/* {!searchResult && <li>{isLoading ? LOADING_TEXT : NO_RESULT}</li>} */}
          {searchResult?.map((disease, idx) => (
            <DiseaseItem key={`${disease.sickNm}-${idx}`} disease={disease} nameIdx={nameIdx} idx={idx} />
          ))}
        </ul>
      )}
    </div>
  );
});

SearchRecommendation.displayName = 'SearchRecommendation';

export default SearchRecommendation;
