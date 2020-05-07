class Task{
    constructor(name,dueDate,isDone){
        this.name=name;
        this.dueDate=dueDate;
        this.isDone=isDone;
    }


}
var array=[1,2,3,4,5];
array.splice(3,1);
console.log(array[3])

function init(){
    task=new Task("first",new Date("May 30,2020"),false)
}