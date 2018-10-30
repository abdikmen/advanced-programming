class Student{
	constructor(id, name, gpa){
	this.id = id;
	this.name = name;
	this.gpa = gpa;	
	this.courses = [];
	}		

    toString() {
    return this.name;
  }



}
class Courses{
	constructor(name, time, date){
	this.name = name;
	this.time = time;
	this.date = date;
	this.rooms = [];	
	}


    toString() {
    return this.name +": "+this.gpa;
  }



}

const url = "https://maeyler.github.io/JS/data/";


let asd = new Map();
let asd2 = new Map();


 function report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        out.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
}

function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
    let s = new Student(id, name, gpa);

    for (let i=3; i<b.length; i++){
        s.courses.push(b[i]);
    }
    
    return s;
}

function parseCourse(line) {
    let b = line.split("\t");
    let name = b[0], time = b[1], date = b[2];
    let c = new Courses(name, time, date);
    for (let i=3; i<b.length; i++){
        c.rooms.push(b[i]);
    }    
    return c;
}


class Database{

    constructor(){
		this.stM = new Map();
        this.csM = new Map();
	}
	
readStudent(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(r => r.text())
        .then(this.addStudents);
}
readCourse(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(r => r.text())
        .then(this.addCourse);
}


 addStudents(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    let counter = 0; 
    msg += a.length+" lines, ";
    for (let s of a) {
     asd.set(counter, parseStudent(s));
     counter++;
    }
}

addCourse(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    let counter = 0; 
    msg += a.length+" lines, ";
    for (let s of a) {
    	let c = parseCourse(s).name;
     asd2.set(c, parseCourse(s))
     counter++;
    }
}




 randomStd() {
    let i = Math.floor(Math.random() * Math.floor(asd.size));
    let b = asd.get(i);
    report("Random: "+b.name, b.id);
}


 findID(id) {
    let i = keys.indexOf(id);
    if (i < 0) return null;
    return vals[i];
}
 showStd(id) {
    let t = id+" ";
    let std = findID(id);
    if (!std) {
        report(t+"not found"); return;
    }
    t += std.name+" "+std.gpa;
    report(t, std.list.length+" courses", std.list);
	}

	aboveGPA(x){
	let counter = 0;
	x = document.getElementById("gp").value;

	for (var i = 0; i < asd.size; i++) {
		if(asd.get(i).gpa > x){
			counter ++; 
		}
	}
	report(counter + " students have got more gpa than " + x); 
	}

	findCoursesStu(y){
		y = document.getElementById("id").value;

		for (var i = 0; i < asd.size; i++) {
			if(asd.get(i).id == y){
				console.log(asd.get(i).courses);
			}
	}
	}

	examSchedule(y){
		y = document.getElementById("id").value;
		for(let c of asd.values()){
			let rm = c.courses;
			for(let r of rm){
				if(y == r){
					counter++;
				}else{
					
				}
			}
		}

	}

	studentList(z){
		z = document.getElementById("code").value;
		for (var i = 0; i < asd.size; i++) {
			let crs = asd.get(i).courses;
			for(let c of crs){
				if(z == c){
					report(asd.get(i).name);
				}
			}
		}

	}

	givenRoom(q){
		q = document.getElementById("rm").value;
		let counter = 0;
		for(let c of asd2.values()){
			let rm = c.rooms;
			for(let r of rm){
				if(q == r){
					counter++;
				}else{
					
				}
			}
		}
		report(counter);
	}		

	surveillanceList(){
		let counter = 0;
		for (var i = 0; i < asd.size; i++) {
			if(asd.get(i).gpa < 1.8){
				counter ++;
			}
		}
		report(counter + " students is in surveillance list "); 
	}

	examRoom(q){
		for(let c of asd2.values()){
			let rm = c.rooms;
			for(let r of rm){
				if(q == r){
					report(asd2.values(r).name); 
				}else{
					
				}
			}
		}
	}



}

