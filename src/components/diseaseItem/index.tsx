import styles from './diseaseItem.module.scss';
import { BsSearch } from 'react-icons/bs';
import cn from 'classnames';
import { IDiseaseItem } from 'types/disease';
import { useRecoilValue } from 'recoil';
import { searchWordState } from '../../states/disease';

const cx = cn.bind(styles);

interface Props {
  disease: IDiseaseItem;
  nameIdx: number;
  idx: number;
}

const DiseaseItem = ({ disease, nameIdx, idx }: Props) => {
  const { sickNm } = disease;
  const searchWord = useRecoilValue(searchWordState);
  return (
    <li className={styles.diseaseWrapper}>
      <BsSearch className={styles.reactIcons} />
      <span className={cx(styles.searchWord, { [styles.highlight]: nameIdx === idx })}>
        {sickNm.substring(0, sickNm.indexOf(searchWord))}
        <mark>{searchWord}</mark>
        {sickNm.substring(sickNm.indexOf(searchWord) + searchWord.length)}
      </span>
    </li>
  );
};

export default DiseaseItem;
