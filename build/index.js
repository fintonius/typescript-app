"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let index = 0;
// This is telling TS that this array will be expected to only be filled
// with Task types so if we accidentally push any other type into the 
// array it will throw an error. TS also throws an error if you don't
// define the type that the array is expected to return so you need to
// know this when you're creating it!
// The '<>' used to define the type the array will return is TS syntax
// called 'generics'. They act kind of like the arguments, '()', that a 
// function takes. You can use other JS types, 'string', 'number', 'object',
// etc., in generics but as it's TS being as specific as possible is 
// always best!
let tasks = [];
function create(content) {
    let task = {
        kind: 'task',
        content,
        id: index++,
        status: 'incomplete',
        createdAt: new Date(),
    };
    tasks.push(task);
    return task;
}
function complete(id) {
    let task = tasks.find((task) => task.id === id);
    // the 'if' statement is to ensure that 'task' was passed a valid id so that we
    // can be sure that changing 'task.status' to 'complete' is correct. As the 
    // value for 'task' when you hover over it is 'undefined' it means TS can't be
    // sure what the correct value for 'task.id' is so will throw an error to make
    // sure we are certain the value is correct and not 'undefined'! Hence checking
    // below that task is true before changing task.status
    if (task && task.kind === 'task')
        task.status = 'complete';
}
function remove(id) {
    let index = tasks.findIndex((task) => task.id === id);
    // As findIndex returns '-1' when it cannot find a match 
    // this 'if' statement is to ensure that we are receiving a valid id. 
    // IT'S IMPORTANT TO NOTE THAT TS ITSELF DOES NOT CATCH THIS BUG AS 
    // -1 IS STILL A NUMBER SO TS DOESN'T PICKUP ON THE FACT IT'S NOT WHAT
    // WE WANT! 
    if (index !== -1)
        tasks.splice(index, 1);
}
function createBirthday(name, date) {
    let task = {
        kind: 'birthday',
        name,
        date: new Date(date),
        id: index++,
        createdAt: new Date(),
    };
    tasks.push(task);
    return task;
}
function list() {
    for (let task of tasks) {
        if (task.kind === 'birthday') {
            let birthday = task.date.toLocaleDateString('en-GB');
            console.log('[★]' + task.name + ' ' + birthday);
        }
        else {
            let check = task.status === 'complete' ? '[✔︎]' : '[ ]';
            console.log(check + task.content);
        }
    }
}
