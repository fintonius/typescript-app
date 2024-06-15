// COMMANDS TO RUN IN TERMINALS TO WATCH CODE:
// node --watch build/index.js 
// npx tsc -w
import { styleText } from "node:util";
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
let tasks: Array<Task | Birthday> = [];
// IMPORTANT NOTE: Arrays in TS cannot change the type of items it can take
// once it's defined - you could not pass a 'number' type into an array 
// declared as 'Array<String>' for example.
// Arrays in TS can take mixed types 

// 'Task' is a type alias. It is like a variable in JS and lets you define a
// type that can be reused throughout your code. Types can also be imported
// and exported between different files.
type Task = {
    // it is good practice to explicity declare what type each parameter will return
    // TS will infer the type if it is not declared which can lead to issues
    content: String;
    id: Number;
    // 'status' is being defined as a "literal type". This is more strict as the
    // type can "literally", in this instance, only be the 'incomplete' or 'complete'. It's
    // good practice to be as strict as possible when defining types. If you want 
    // something to only return a very specific answer then declare this from the 
    // outset! 
    // The '|' is called a 'union operator'. It allows TS to check between the 
    // different values 
    status: 'incomplete' | 'complete';
    // when dealing with multiple types it's good to give it a 'kind' property so
    // we can always confirm exactly which type we're dealing with.
    kind: 'task';
    createdAt: Date;
    birthday?: Date;
}

type Birthday = {
    kind: 'birthday';
    name: string;
    date: Date;
    id: number;
    createdAt: Date;
}

function create(content: string): Task {
    let task: Task = {
        kind: 'task',
        content,
        id: index++,
        status: 'incomplete',
        createdAt: new Date(),
    };
    tasks.push(task);
    return task;
}

function complete(id: number) {   
    let task = tasks.find((task) => task.id  === id);
    // the 'if' statement is to ensure that 'task' was passed a valid id so that we
    // can be sure that changing 'task.status' to 'complete' is correct. As the 
    // value for 'task' when you hover over it is 'undefined' it means TS can't be
    // sure what the correct value for 'task.id' is so will throw an error to make
    // sure we are certain the value is correct and not 'undefined'! Hence checking
    // below that task is true before changing task.status
    if (task && task.kind === 'task') task.status = 'complete';
}

function remove(id: number) {
    let index = tasks.findIndex((task) => task.id === id);
    // As findIndex returns '-1' when it cannot find a match 
    // this 'if' statement is to ensure that we are receiving a valid id. 
    // IT'S IMPORTANT TO NOTE THAT TS ITSELF DOES NOT CATCH THIS BUG AS 
    // -1 IS STILL A NUMBER SO TS DOESN'T PICKUP ON THE FACT IT'S NOT WHAT
    // WE WANT! 
    if (index !== -1) tasks.splice(index, 1);
}

function createBirthday(name: string, date: string): Birthday {
    let task: Birthday = {
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
        } else {
            let check = task.status === 'complete' ? '[✔︎]' : '[ ]';
            console.log(check + task.content);
        }
    }
}