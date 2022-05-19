import axios from 'axios';

export const getSearchResult = async (keyword: string) => {
  console.log('fetch!');
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}`, {
      params: {
        searchText: keyword,
        ServiceKey: `${process.env.REACT_APP_SERVICE_KEY}`,
      },
    })
    .then((res) => {
      if (keyword === '' || res.data.response.body.totalCount === 0) {
        return [];
      }
      if (res.data.response.body.totalCount === 1) {
        return [res.data.response.body.items];
      }
      return res.data.response.body.items.item;
    });
};
