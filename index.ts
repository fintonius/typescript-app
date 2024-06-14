let index = 0;

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
    createdAt: Date;
}

let tasks: Array = [];

function create(content: string): Task {
    return {
        content,
        id: i++,
        status: 'incomplete',
        createdAt: new Date(),
    };
}

function complete(task: Task) {   
    task.status = 'complete';
}
