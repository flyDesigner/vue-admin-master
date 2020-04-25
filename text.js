function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
}

Person.prototype = {
    sayName: function(){
        console.log(this.name)
    },
    sayAge: function() {
        console.log(this.age)
    },
    sayJob: function() {
        console.log(this.job)
    }
}


function Man() {
    this.sex = 'nan';
    Person.call(this,...arguments);
}

Man.prototype = new Person();

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

console.log(Person)