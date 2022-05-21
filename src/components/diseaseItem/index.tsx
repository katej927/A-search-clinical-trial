import cn from 'classnames';
import { useRecoilValue } from 'recoil';
import { keyDownIndexState } from 'states';

import { BsSearch } from 'react-icons/bs';
import { IDiseaseItem } from 'types/disease';
import { CLINICALTRIALSKOREA } from 'services';

import styles from './diseaseItem.module.scss';
import { searchWordState } from '../../states/disease';

const cx = cn.bind(styles);

interface Props {
  disease: IDiseaseItem;
  idx: number;
}

const DiseaseItem = ({ disease, idx }: Props) => {
  const nameIdx = useRecoilValue(keyDownIndexState);
  const searchWord = useRecoilValue(searchWordState);
  const { sickNm } = disease;

  return (
    <a href={`${CLINICALTRIALSKOREA}${sickNm}`} className={styles.link}>
      <li className={cx(styles.diseaseWrapper, { [styles.highlight]: nameIdx === idx })}>
        <BsSearch className={styles.reactIcons} />
        <span className={cx(styles.searchWord, { [styles.highlight]: nameIdx === idx })}>
          {sickNm.substring(0, sickNm.indexOf(searchWord))}
          <mark className={cx(styles.mark, { [styles.highlight]: nameIdx === idx })}>{searchWord}</mark>
          {sickNm.substring(sickNm.indexOf(searchWord) + searchWord.length)}
        </span>
      </li>
    </a>
  );
};

export default DiseaseItem;
