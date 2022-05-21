import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

export const getSearchResult = async (keyword: string, controller?: AbortController) => {
  return axios
    .get(`${PROXY}/${process.env.REACT_APP_BASE_URL}`, {
      signal: controller?.signal,
      params: {
        serviceKey: `${process.env.REACT_APP_SERVICE_KEY}`,
        searchText: keyword,
      },
    })
    .then((res) => {
      const {
        totalCount,
        items: { item },
      } = res.data.response.body;
      if (keyword === '' || totalCount === 0) {
        return [];
      }
      if (totalCount === 1) {
        return [item];
      }
      return item;
    });
};

export const CLINICALTRIALSKOREA = 'https://clinicaltrialskorea.com/studies?condition=';
