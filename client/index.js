// 로그인 예시파일
import fetch from 'node-fetch';
const baseURL = 'http://localhost:8080'; // 서버 port값에 따라 수정
let url = '/staff/login'; // 요청하는 url 정보에 따라 수정

// request body 부분으로 어떤 요청이냐에 따라 수정
const staff_no = '12345678';
const password = '12345';
const body = {
    staff_no: staff_no,
    password: password,
};

// 로그인 요청 부분
let res = await fetch(`${baseURL}${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
});
const data = await res.json();

// 로그인 후 받아진 response부분에서 token만 추출하고 어디가에 저장해둬야 함
// 추출한 토큰을 추후 서버측으로 요청을 보낼 때, 아래  headers: { Authorization: 'Bearer token'} 형태로 추가해서 보내면
// 서버측에서 로그인 한 것으로 처리됨
const token = data.token;
console.log(data);
console.log(token);

// token을 함께 보냈을 때, 자신의 직원 정보를 요청하는 경우
url = '/staff/me';
res = await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

const staff = await res.json();
console.log(staff);
