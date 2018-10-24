class Student{
	constructor(id, name, gpa){
	this.id = id;
	this.name = name;
	this.gpa = gpa;	
	this.courses = [];
	}
	toString(){
		return "id: " + this.id + "name: " + this.name +
		"gpa: " + this. gpa;  
	}
}
class Course{
	constructor(name, time, date){
	this.name = name;
	this.time = time;
	this.date = date;
	this.rooms = [];	
	}
	toString(){
		return "name: " + this.name + "time: " + this.time +
		"date: " + this.date;  
	}
}
