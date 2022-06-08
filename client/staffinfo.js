const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZl9ubyI6IjAwMDAwMDAyIiwiaWF0IjoxNjU0Njg2OTA5LCJleHAiOjE2NTQ2OTA1MDl9.m9mgT2RIR8pQRILnNQaSH2K5DvjxILJmog9YTd_4cs0';
const infoBtn = document.querySelector('.info-btn');
const staffInfo = document.querySelector('.info');

async function staffInfoMe() {
  const baseURL = `http://localhost:3000`;
  const url = '/staff/me';

  let res = await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaion/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (res.status >= 400) {
    console.log(data.message);
    return;
  }
  staffInfo.innerHTML = `
        <div class='staff-info'>
            ${data.STAFF_NM}
        </div>
    `;
}

infoBtn.addEventListener('click', (event) => {
  event.preventDefault();
  staffInfoMe();
});
