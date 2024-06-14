"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let index = 0;
let tasks = [];
function create(content) {
    let task = {
        content,
        id: index++,
        status: 'incomplete',
        createdAt: new Date(),
    };
    tasks.push(task);
    return task;
}
function complete(task) {
    task.status = 'complete';
}
