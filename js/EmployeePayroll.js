class EmployeePayrollData{
    //getter setter Method
    get id() {return this.id}
    set id(id){
        this.id = id;
    }

    get name(){return this._name}
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if(nameRegex.test(name))
            this._name = name
        else throw 'Name is Incorrect!'
    }
    get profilePic() { return this._profilePic}
    set profilePic(profilePic){
        this._profilePic = profilePic
    }

    get gender () { return this._gender}
    set gender(gender){
        this._gender = gender;
    }

    get department () { return this._department}
    set department(department){
        this._department = department;
    }

    get salary () { return this._salary}
    set salary(salary){
        this._salary = salary;
    }
    get note () { return this._note}
    set note(note){
        this._note = note;
    }
    get startDate () { return this._startDate}
    set startDate(startDate){
        this._startDate = startDate;
    }
    //Method
    toString(){
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = !this.startDate ? 'undefined' :
                        this.startDate.toLocaleDateString("en-US", options);
        return "id= " + this.id + ", Name= " + this.name + ", Gender= " + this.gender +
        ", ProfilePic= " + this.profilePic + ", Department= " + this.department + 
        ", Salary= " + this.salary + ", Start Date= " + this.empDate + ", Note= " + this.note
    }
}