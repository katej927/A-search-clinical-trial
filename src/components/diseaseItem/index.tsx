import styles from './diseaseItem.module.scss';
import { BsSearch } from 'react-icons/bs';
import cn from 'classnames';
import { IDiseaseItem } from 'types/disease';

const cx = cn.bind(styles);

interface Props {
  disease: IDiseaseItem;
  nameIdx: number;
  idx: number;
}

const DiseaseItem = ({ disease, nameIdx, idx }: Props) => {
  const { sickNm } = disease;
  return (
    <li className={cx(styles.diseaseWrapper, { [styles.highlight]: nameIdx === idx })}>
      <BsSearch className={styles.reactIcons} />
      <span className={styles.searchWord}>{sickNm}</span>
    </li>
  );
};

export default DiseaseItem;
