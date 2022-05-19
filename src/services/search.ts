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
      const { totalCount, items } = res.data.response.body;
      if (keyword === '' || totalCount === 0) {
        return [];
      }
      if (totalCount === 1) {
        return [items];
      }
      return items.item;
    });
};
