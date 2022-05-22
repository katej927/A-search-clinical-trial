#  🏷 프로젝트 상세

> 🚀 
[**Deploy Link**](https://1a-search-clinical-trial.netlify.app/)
> 

휴먼 스케이프 선발 과제로 검색어 추천이 있는 검색창 구현 프로젝트입니다.

# 🏷 실행 방법

1. repository clone
    
    ```bash
    git clone https://github.com/wanted-pre-onboarding-FE-01/A-search-clinical-trial.git
    ```
    
2. 해당 프로젝트 폴더로 이동
    
    ```bash
    cd A-search-clinical-trial
    ```
    
3. 필요 package들 설치
    
    ```bash
    npm intall 
    or 
    yarn install
    ```
    
4. 프로젝트 실행
    
    ```bash
    npm start
    ```
    

#  🏷 요구 사항

## 1. 필수 구현

☑️  [https://clinicaltrialskorea.com/](https://clinicaltrialskorea.com/) 에 접속해 검색 영역을 클론 코딩<br>
☑️ 공공 데이터 API를 활용해서 질환명 검색시 추천하는 부분 UI 구현<br>
☑️ API 호출 최적화<br>
☑️ 키보드만으로 추천 검색어들로 이동 가능

## 2. 도전 과제

☑️ 배포<br>
☑️ 퍼지 문자열 검색 지원<br>
☑️ 사용자가 입력한 질환명과 일치하는 부분만 볼드처리

# 🏷 팀원, 기간

- 팀원 : 박솔찬 신가은 이다슬 정선미 홍선영
- 기간 : 2022 / 05 / 19 ~ 2022 / 05 / 22

# 🏷 사용 기술, 라이브러리

- **React + JavaScript + TypeScript + SCSS**
- [**Axios**](https://www.npmjs.com/package/axios)
- [**React-query**](https://react-query.tanstack.com/)
- [**recoil**](https://recoiljs.org/) (전역 상태 관리)
- [**react-loading**](https://www.npmjs.com/package/react-loading) (loading spinner)
- [**react-icon**](https://react-icons.github.io/react-icons/) (icon)

# 🏷 구현 기능

## 1. 검색 영역 클론 코딩, 질환명 검색시 추천 부분 API 호출하여 렌더링
- 공공 API를 이용해 검색창에 텍스트를 입력할때마다 검색어를 추천받아 각 경우에 따라서 렌더링 할 수 있도록 구현했습니다.
## 2.  API 호출 최적화
### 1) **✨ react-query**

- 구현한 방법
    - `useQuery` 를 사용하여 같은 API를 호출했을 때 서버에서 받아 온 데이터를 캐싱하여 특정 시간 동안 받아온 데이터가 있을 때, API호출을 하지 않도록 했습니다.  
        - enabled를 설정하여 검색값이 true일 때 useQuery를 실행
        - staleTime이 만료되지 않았다면 데이터가 fresh 상태일 때 fetch하지 않도록 설정
        - cacheTime 옵션 사용
### 2) ✨ **중복된 api 요청 취소 기능**

[https://user-images.githubusercontent.com/79626675/169638958-b5627fd2-fcb6-402f-9baf-b4263e8aee82.mov](https://user-images.githubusercontent.com/79626675/169638958-b5627fd2-fcb6-402f-9baf-b4263e8aee82.mov)

- 구현한 방법
    - axios `abortController`
    - axios 요청 파라미터에 abortController의 메소드인 `signal`을 할당
    - 취소하고 싶을 때 해당 signal을 취소하는 `abort()` 메소드를 사용
- 이유
    - 모든 api 요청이 넘어 올 때마다 결과를 반환하면 대기 시간이 길어짐.
    - 느린 api 속도를 보완하기 위해 pending 상태일 때 새로운 요청이 온다면 이 전 요청을 취소하고 새로운 요청을 반환하도록 함.
    

### 3) **✨ 디바운싱**

- 구현한 방법
    - 검색입력값(value)과 지연시간(delay)을 파라미터로 받는 커스텀 훅을 생성
    - `setTimeout` 함수를 사용하여 검색입력값이 업데이트될 때 마다 타이머를 초기화하고,타이머가 만료되면 입력값을 state에 업데이트 하는 함수를 실행
    - 검색어 입력 연타가 끝나고 일정시간동안(0.5초) 입력이 없을 때 API 요청
- 이유
    - 검색어 연타시 매번 API를 호출하게 되면 필요없는 요청이 모두 전송됨



## 3. 키보드만으로 추천 검색어들로 이동

[https://user-images.githubusercontent.com/79626675/169639380-643b7016-f153-4fdd-91fe-a008194737bd.mov](https://user-images.githubusercontent.com/79626675/169639380-643b7016-f153-4fdd-91fe-a008194737bd.mov)

[https://user-images.githubusercontent.com/79626675/169639546-793fe472-5329-46ed-82f5-33c9d0b35029.mov](https://user-images.githubusercontent.com/79626675/169639546-793fe472-5329-46ed-82f5-33c9d0b35029.mov)

- 자세한 실행 방법
    1. 검색창 클릭 -> 검색어 입력
    2. 방향키 ⬆️,⬇️(`ArrowDown`, `ArrowDown`) 로 검색 결과 이동
    3. 검색 결과 클릭 시 한국임상정보 페이지 결과로 이동
- 구현 방법
    - 추천 검색어들로 이동
        
        keydown을 했을 때, 방향키(e.key의 결과값)에 따라 선택된 index를 recoil의 atom에 업데이트 해주고 이 값과 일치하는 질병명칭 리스트의 index는 highlight 됨.
        
    - input 창에 키보드로 이동한 검색어 출현
        
        받아온 데이터 값이 있고 추천 검색어들로 이동한 상태라면, 선택된 병명을 return 한 값을 input value로 할당
        
        - 이유: 대부분의 사이트들이 구현한 방식이기 때문
    - 키보드로 검색어 또는 검색 중 onSubmit 이벤트가 발생하거나 추천 검색어을 onClick시, 실제 검색 결과 조회 가능
        
         window.location.href로 실제 사이트 이동
        
        - 이유: 보다 자연스러운 UX를 위해서 추가

## 4. 퍼지 문자열 지원

### 🔎  **검색결과 정렬**

- 구현한 방법
    
    **다음의 두 기준 순위를 통해 정렬을 수행**
    
    - 검색어의 위치
    - 검색결과 단어의 길이 (짧을수록 우선 순위)
    - 검색결과 단어 비교
    - 정렬은 배열의 `sort` 메서드에 위 기준을 `compareFunction`으로 주어 수행
- 이유
    - 기본적으로 검색어의 위치가 앞에 있는 단어가 사용자가 원하는 단어일 확률이 높기 때문
    - 검색결과 단어의 검색어 위치가 같고 검색결과 단어의 길이가 같은 경우, 검색결과 단어 자체를 비교하여 정렬 기준을 강화

### 🔎 **검색어 하이라이트**

- 구현한 방법
    - 검색어를 기준으로 검색결과 단어의 인덱스를 통해 `substring`하여 검색어 기준 앞의 문자열을 추출
    - 검색어를 기준으로 검색결과 단어의 인덱스와 검색어의 길이를 더한 값을 통해 `substring`하여 검색어 기준 뒤의 문자열을 추출
    - 위 두 결과 사이에 `mark` 태그로 감싸진 검색어를 넣어 완성
- 이유
    - `mark` 태그를 사용해서 해당 단어만 하이라이트 주어야 한다고 생각
    - 해당 부분만 `mark` 태그로 감싸기 위해 문자열을 자를 필요가 있었음

# 구현하면서 어려웠던 점

[https://user-images.githubusercontent.com/79626675/169662623-6a1c8751-6bf8-4bf1-8cbe-683a0dd11a48.mov](https://user-images.githubusercontent.com/79626675/169662623-6a1c8751-6bf8-4bf1-8cbe-683a0dd11a48.mov)

- 어려웠던 점
    
    키보드로 추천 검색어 이동을 구현할 때, 실제 사이트에서는 구현이 되어 있지 않은 부분을 하려다 보니 기획(기능)과 디자인이 명확하지 않아서 타기능 담당 개발자와의 코드 구현에 혼선이 있었으나 최대한 대중적인 방식으로 접근하려고 노력함.