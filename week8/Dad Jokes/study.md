# fetch와 axios 
http 통신을 도와주는 api로 axios, fetch 2가지 방법이 있다. 

axios
-promise를 기반으로 하며 asyc/await문법 사용.
-구형 브라우저 지원
-Node.js에서도 사용 가능(fetch의 경우 별도 라이브러리로 사용 가능)
-JSON 데이터 자동 변환 가능
-요청을 중도 Cancel, 응답시간 초과 설정 등의 기능 


fetch의 장점
-라이브러리를 import 하지 않아도 사용 가능
-->따라서 바닐라로 짤 때는 fetch를 사용하는 게 편하다.
-->import 모듈을 사용할 수 없으므로 CDN 을 넣는다. 

웹에서 찾아보니 다들 axios의 장점을 더 크게 써놓았다. 
전에 리액트 프로젝트에서 뭘 사용했는지 찾아보니 난 axios를 사용했었다. 데이터를 받아오는데 계속 헤맸었는데, 분명 fetch도 사용해보았다가 안돼서 axios를 사용했었다. 

how to fetch data with react hooks 로 검색해보면 비슷하지만 조금씩 다른 코드들을 많이 찾아볼 수 있다. 
axios가 더 많은 기능을 지원해주기 때문에 axios가 조금 더 무겁고, fetch가 조금 더 가벼운 느낌이라고 한다. 더 대중적인 것은 axios인 듯. 
에러 핸들링이나, json() 메서드를 한 번 더 사용하지 않는다는 점에서 추천하는 면이 있다. 