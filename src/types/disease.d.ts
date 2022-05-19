export interface IDiseaseRoot {
  response: IDiseaseResponse;
}

export interface IDiseaseResponse {
  header: IDiseaseHeader;
  body: IDiseaseBody;
}

export interface IDiseaseHeader {
  resultCode: string;
  resultMsg: string;
}

export interface IDiseaseBody {
  items: IDiseaseItems;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface IDiseaseItems {
  item: IDiseaseItem[];
}

export interface IDiseaseItem {
  sickCd: string;
  sickNm: string;
}
