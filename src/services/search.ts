import axios from 'axios';
import { IDiseaseRoot } from 'types/disease';

// const controller = new AbortController();

const BASE_URL = `B551182/diseaseInfoService/getDissNameCodeList?`;

interface Params {
  searchText: string;
}

export const getDiseaseName = (params: Params) =>
  axios
    .get<IDiseaseRoot>(BASE_URL, {
      params: {
        ServiceKey: process.env.REACT_APP_DISEASE_NAME_SEARCH_ID,
        ...params,
      },
      // signal: controller.signal,
    })
    .then((res) => {
      const {
        // totalCount,
        items: { item },
      } = res.data.response.body;
      // if (totalCount === 1) return [item];
      return item;
    });

// controller.abort();
