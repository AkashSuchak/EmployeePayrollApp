let isUpdate = false;
let empPayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {  
    const name =document.querySelector('#name');    
    //const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            setTextValue('.text-error', "");
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error', "");
        } catch(e){
            setTextValue('.text-error', e);
        }
    });

    const date =document.querySelector('#date');    
    //const textError = document.querySelector('.text-error');
    date.addEventListener('input', function(){
        let startDate = getInputValueById('#day')+ " "+ getInputValueById('#month') + " "+ getInputValueById('#year');
        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.date-error', "");
        } catch(e){
            setTextValue('.date-error', e);
        }
    });
      
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });

    checkForUpdate();
});
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        //let employeePayrollData = createEmployeePayroll();
        //createAndUpdateStorage(employeePayrollData); 
        resetForm()
        window.location.replace()
    }catch(e){
        return;
    }
}
const setEmployeePayrollObject = () => {
    empPayrollObj._name = getInputValueById('#name');
    empPayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    empPayrollObj._gender = getSelectedValues('[name=gender]').pop();
    empPayrollObj._department = getSelectedValues('[name=department]');
    empPayrollObj._salary = getInputValueById('#salary');
    empPayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    empPayrollObj._startDate = date;
}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error', e)
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    //alert("Hello "+date)
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value  = document.querySelector(id).value;
    return value
}
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value
    return value
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList){
        let employeePayrollData = employeePayrollList.find(empData => empData._id == empPayrollObj._id);
        if(!employeePayrollData)
            employeePayrollList.push(createEmployeePayrollData());
        else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(employeePayrollData._id))
        }
    }else{
        employeePayrollList = [employeePayrollData];
    }
    alert("Added to LocalStorage")
    //alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = empPayrollObj._name;
    } catch (e) {
        setTextValue('text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = empPayrollObj._profilePic;
    employeePayrollData.gender = empPayrollObj._gender;
    employeePayrollData.department = empPayrollObj._department;
    employeePayrollData.salary = empPayrollObj._salary;
    employeePayrollData.note = empPayrollObj._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(empPayrollObj._startDate));
    } catch (error) {
        setTextValue('date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString())
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployrrId");
    empId = !empId ? 1 : (parseInt(empId)+1).toString();
    localStorage.setItem("EmployeeId",empId);
    return empId;
}
const setForm = () => {
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name=profile]', empPayrollObj._profilePic);
    setSelectedValues('[name=gender]', empPayrollObj._gender);
    setSelectedValues('[name=department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._note);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");    
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    })
}

const resetForm = () =>{
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
}
const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked =false;
    });
}
const setTextValue = (id, value) =>{
    const element = document.querySelectorAll(id);
    element.textContent = value;
}

const setValue = (id, value) =>{
    const element = document.querySelectorAll(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element  = document.querySelector(id);
    element.selectedIndex = index;
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}