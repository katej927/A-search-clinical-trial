import cn from 'classnames';
import { useRecoilValue } from 'recoil';

import { IDiseaseItem } from 'types/disease';
import { sortWordList } from '../../utils/word';
import { searchWordState } from '../../states/disease';

import styles from './searchRecommendation.module.scss';
import { Loading } from 'components/loading';
import DiseaseItem from 'components/diseaseItem';

interface Props {
  searchResult: IDiseaseItem[];
  isLoading: boolean;
}

const SearchRecommendation = ({ searchResult, isLoading }: Props) => {
  const searchWord = useRecoilValue(searchWordState);
  return (
    <div className={styles.recommendationWrapper}>
      <span className={styles.title}>추천 검색어</span>
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <ul className={cn('resultWrapper')}>
          {searchResult?.length === 0 && <p className={styles.msg}>검색된 값이 없습니다.</p>}
          {sortWordList(searchWord, searchResult).map((disease, idx) => (
            <DiseaseItem key={`${disease.sickNm}-${idx + 1}`} disease={disease} idx={idx} />
          ))}
        </ul>
      )}
    </div>
  );
};

SearchRecommendation.displayName = 'SearchRecommendation';

export default SearchRecommendation;
