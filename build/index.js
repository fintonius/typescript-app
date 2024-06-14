"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let index = 0;
let tasks = [];
function create(content) {
    return {
        content,
        id: i++,
        status: 'incomplete',
        createdAt: new Date(),
    };
}
function complete(task) {
    task.status = 'complete';
}
