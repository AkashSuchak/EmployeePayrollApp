const stringifyDate = (date) => {
    const options ={ day:'numeric', month:'short', year:'numeric' };
    const newDate = !date ? "undefined" :
        new Date(date).toLocaleDateString('en-GB', options)
    return newDate
}

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._name == node.name);
    if(!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page)
}