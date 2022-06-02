// password : 12345
let staffs = [
    {
        staff_no: '12345678',
        staff_nm: 'jungyo',
        position_cd: '01',
        work_start_time: '09:00',
        work_end_time: '18:00',
        salary: 3000000,
        discharge_date: '',
        account_no: '1234-234-4567-123',
        password:
            '$2a$10$w65T1tzKYru19tPBD0zH4u//jW4CtpacEEX9ljdJpld8prRare4f6',
    },
];

export async function findByStaffNo(staff_no) {
    return staffs.find((staff) => staff.staff_no === staff_no);
}

export async function createStaff(staff) {
    const created = {
        ...staff,
        work_start_time: '',
        work_end_time: '',
        salary: 0,
        discharge_date: '',
    };
    staffs.push(created);
    return staff.staff_no;
}

export async function getAll() {
    return staffs;
}
