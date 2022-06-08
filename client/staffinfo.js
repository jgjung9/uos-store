// 직원 정보를 받아오긴 위한 예시
// 로그인한 직원 본인의 정보를 받아오는 과정입니다.

// 토큰은 유효시간이 있으므로 실험할 때, 토큰을 다른 것으로 교체해줘야 할 수 도 있습니다.
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZl9ubyI6IjAwMDAwMDAyIiwiaWF0IjoxNjU0Njg2OTA5LCJleHAiOjE2NTQ2OTA1MDl9.m9mgT2RIR8pQRILnNQaSH2K5DvjxILJmog9YTd_4cs0';

// 쿼리 셀렉터를 이용해 html tag에 대한 것들을 받아옵니다.
const infoBtn = document.querySelector('.info-btn');
const staffInfo = document.querySelector('.info');

// 직원의 정보를 요청하고 직원 정보가 정상적으로 도착했을 때,
// innerHTML을 이용해 해당 정보를 뿌려줍니다.
async function staffInfoMe() {
  const baseURL = `http://localhost:3000`;
  const url = '/staff/me';

  // 정보를 받아오기 위해서는 로그인 되어 있어야 합니다.
  // 로그인 여부를 확인 하기 위해 headers에 Authorization에 token을
  // 추가해서 서버측으로 요청을 보냅니다.
  // 어떤 요청이냐에 따라 API Spec을 확인하여 body를 추가합니다.
  // staff/me의 경우 로그인 정보만 보내면 확인 가능하므로 body추가는 불필요 합니다.
  let res = await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaion/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // 서버로부터 데이터를 받아옵니다.
  const data = await res.json();

  // 서버의 응답이 400이상일 경우 실패이므로 종료합니다.
  if (res.status >= 400) {
    console.log(data.message);
    return;
  }

  // 서버가 성공적으로 응답했으므로 innerHTML을 이용해
  // 데이터를 html에 넣어서 만들어 줍니다.
  staffInfo.innerHTML = `
        <div class='staff-info'>
            ${data.STAFF_NM}
        </div>
    `;
}

// 버튼에 이벤트리스터를 달고 클릭이 발생했을 때,
// staffInfoMe가 호출되도록 만듭니다.
infoBtn.addEventListener('click', (event) => {
  event.preventDefault();
  staffInfoMe();
});
