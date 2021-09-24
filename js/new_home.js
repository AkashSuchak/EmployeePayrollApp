window.addEventListener('DOMContentLoaded', (event) =>{    
    createInnerHtml();    
});
const createInnerHtml = () => {
    const innerHtml = 
    `<tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td><img class="profile" src="../assets/Ellipse-2.png" alt=""></td>
        <td>Akash Suchak</td>
        <td>Male</td>
        <td><div class="dept-label">HR</div>
            <div class="dept-label">Finance</div></td>
        <td>500000</td>
        <td>20 Jan 2021</td>
        <td>
            <img id="1" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="1" onclick="upadte(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
    </tr>`;    
    document.querySelector('#table-display').innerHTML = innerHtml;
}