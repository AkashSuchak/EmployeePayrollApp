class EmployeePayrollData{
    //getter setter Method
    get id() {return this._id}
    set id(id){
        this._id = id;
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
        let now = new Date();
        if(startDate > now) throw 'Start Date is Future Date!';
        var diff = Math.abs(now.getTime() - startDate);
        if(diff / (1000*60*60*24) > 30)
            throw 'Start date is beyond 30 Days!';
        this._startDate = startDate;
    }
    //Method
    toString(){
        const options ={ day:'numeric', month:'short', year:'numeric' };              
        const empDate = !this.startDate ? "undefined" : 
                        new Date(this.startDate).toLocaleDateString("en-GB", options); 
              
        return  "ID = " + this.id + ", Name= " + this.name + ", Gender= " + this.gender + 
                ", ProfilePic= " + this.profilePic + ", Department= " + this.department + 
                ", Salary= " + this.salary + ", Start Date= " + empDate + ", Note= " + this.note
         
               
    }
}