let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) =>{    
    empPayrollList = getEmployeePayrollDataFromStorage();   
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');   
});
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
            JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}
const createInnerHtml = () => {
    const headerHtml  = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if(empPayrollList.length == 0) return;
    //let empPayrollData = createEmployeePayrollJSON()[1];
    let innerHtml =`${headerHtml}`;
    //let empPayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
    <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
            <img name="${empPayrollData._name}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img name="${empPayrollData._name}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
    </tr>`; 
    }   
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const createEmployeePayrollJSON = () =>{
    let empPayrollListLocal = [
        {
            _name: 'Akash Suchak',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '21 Sept 2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic:'../assets/Ellipse-2.png'
        },
        {
            _name: 'Amarpa Shashanka Keerthi Kumar',
            _gender: 'female',
            _department: [
                'Sales'                
            ],
            _salary: '400000',
            _startDate: '21 Sept 2021',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic:'../assets/Ellipse-1.png'
        }
    ]
    return empPayrollListLocal;    
}
// function to get department from array and create label for each
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}
// function to remove an existing employee
const remove = (node) => {    
    let empPayrollData = empPayrollList.find(empData => empData._name == node.name);
    if(!empPayrollData) return;
    // get index of the employee, splice, set it to local storage and then update the table
    const index =empPayrollList
            .map(empData => empData._id)
            .indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;   
    createInnerHtml();
}