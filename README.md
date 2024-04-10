# Search Clinical Trial

![Search Clinical Trial1](https://github.com/katej927/Algorithm/assets/69146527/2718e7c1-8939-4189-b2ba-279100e03693)


## 1️⃣ 프로젝트 개요


> 검색어 추천이 있는 국내 임상시험 검색 사이트
> 

- 구현한 부분 : 키보드와 마우스로 추천 검색어 이동하여 검색하는 기능, 전체적인 코드 베이스

- 기간 : ‘22.5.19 ~ 5.22
- 프론트엔드 5명

## 2️⃣ Links


👉 화면 확인 : [배포 링크](https://1a-search-clinical-trial.netlify.app/)

👉 코드 확인 : [전체 코드](https://github.com/katej927/A-search-clinical-trial)

## 3️⃣ Techs


※ 제가 사용하지 않은 기술들은 생략했습니다.

- React, Typescript, SCSS
- Recoil
- TanStack Query
- Axios

## 4️⃣ 구현 내용

※ 팀원분들이 구현하신 것들은 생략했습니다.

## 🔸 **키보드만으로 추천 검색어들로 이동하고 결과 조회**

![Search Clinical Trial2](https://github.com/katej927/Algorithm/assets/69146527/8a3ea199-d9ae-4802-8c64-df419e70b623)

### 🔹 실행 방법
<details>
  <summary>자세히 보기</summary>

  1. 검색창 클릭 → 검색어 입력
  2. 방향키(⬆️, ⬇️)로 검색 결과 이동
  3. 검색 결과 클릭 시 한국임상정보 페이지 결과로 이동

</details>

### 🔹 구현 방법
#### 1. 추천 검색어들로 이동

<details>
      <summary>자세히 보기</summary>

  - 구현 방법

      keydown을 했을 때, 방향키(e.key의 결과값)에 따라 선택된 index를 recoil의 atom에 업데이트 해주고 이 값과 일치하는 질병명칭 리스트의 index는 highlight 됨.
        
   - 코드
        
      👉 [실제 코드 보기](https://github.com/katej927/A-search-clinical-trial/blob/main/src/utils/handleKeyArrow.ts)
        
      ```tsx
      export const handleKeyArrow = (
        e: KeyboardEvent,
        searchResult: IDiseaseItem[],
        setNameIdx: Dispatch<React.SetStateAction<number>>,
        handleSettingBeforeApi: (setSearchWordValue?: string, setNameIdxValue?: number) => void
      ) => {
        const {
          key,
          nativeEvent: { isComposing },
        } = e;
        if (!searchResult || !searchResult.length || isComposing) return;
      
        switch (key) {
          case 'ArrowDown':
            setNameIdx((prevNum) => (searchResult.length === prevNum + 1 ? 0 : prevNum + 1));
            break;
          case 'ArrowUp':
            setNameIdx((prevNum) => (prevNum <= 0 ? searchResult.length - 1 : prevNum - 1));
            break;
          case 'Escape':
            handleSettingBeforeApi();
            break;
        }
      };
      ```

</details>

  
  
####   2. input 창에 키보드로 이동한 검색어 출현
<details>
        <summary>자세히 보기</summary>

> 받아온 데이터 값이 있고 추천 검색어들로 이동한 상태라면, 선택된 병명을 return 한 값을 input value로 할당
        
  
- UI
            
     ![Search Clinical Trial3](https://github.com/katej927/Algorithm/assets/69146527/05ed8a55-6742-4422-ab68-ca6980546adc)

 - 구현 이유 : 대부분의 사이트들이 구현한 방식이기 때문
 - 코드
            
      👉 [자세히 보기](https://github.com/katej927/A-search-clinical-trial/blob/main/src/components/searchBar/index.tsx)
            
      ```tsx
            const keyDownName = searchResult && nameIdx > -1 ? searchResult[nameIdx].sickNm : searchWord;
            
            (...생략)
            
            <input
            	className={styles.searchInput}
            	type='search'
            	placeholder='질환명을 입력해 주세요.'
            	onChange={handleSearchWord}
            	onKeyDown={handleKeyDown}
            	value={keyDownName}
            />
      ```

</details>
  

#### 3. 키보드로 검색어 또는 검색 중 onSubmit 이벤트가 발생하거나 추천 검색어을 onClick시, 실제 검색 결과 조회 가능

<details>
    <summary>자세히 보기</summary>

   - 구현 방법
     `window.location.href`로 실제 사이트 이동
        
   - 코드

        👉 [실제 코드 보기](https://github.com/katej927/A-search-clinical-trial/blob/main/src/components/searchBar/index.tsx)
        
        ```tsx
        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            window.location.href = `${CLINICALTRIALSKOREA}${nameIdx > -1 ? searchResult[nameIdx].sickNm : searchWord}`;
        };
        ```

</details>
  
  

  ## 🔸 전체적인 코드 베이스

👉 [코드로 확인하기](https://github.com/katej927/A-search-clinical-trial/commit/5943d403d37bd64416f8789462d1f54eaa0634c9#diff-4ddd70cdaca5d2d4ca4a1d500c83036cb743233c03ac9186746e2aefc35c43f3)
