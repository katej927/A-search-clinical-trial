import { useRecoilValue } from 'recoil';
import { keyDownIndexState } from 'states';
import { BsSearch } from 'react-icons/bs';
import styles from './diseaseItem.module.scss';
import cn from 'classnames';
import { IDiseaseItem } from 'types/disease';

const cx = cn.bind(styles);

interface Props {
  disease: IDiseaseItem;
  idx: number;
}

const DiseaseItem = ({ disease, idx }: Props) => {
  const nameIdx = useRecoilValue(keyDownIndexState);
  const { sickNm } = disease;

  return (
    <li className={styles.diseaseWrapper}>
      <BsSearch className={styles.reactIcons} />
      <span className={cx(styles.searchWord, { [styles.highlight]: nameIdx === idx })}>{sickNm}</span>
    </li>
  );
};

export default DiseaseItem;
