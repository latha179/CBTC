document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('new-task').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        text: taskText,
        dateAdded: new Date().toLocaleString(),
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

function completeTask(taskItem, task) {
    taskItem.remove();
    task.completed = true;
    task.dateCompleted = new Date().toLocaleString();
    saveTask(task);
    renderTask(task);
}

function deleteTask(taskItem, task) {
    taskItem.remove();
    removeTask(task);
}

function renderTask(task) {
    const taskList = task.completed ? document.getElementById('completed-list') : document.getElementById('task-list');
    const taskItem = document.createElement('li');
    const taskContent = document.createElement('span');
    taskContent.textContent = `${task.text} - ${task.completed ? `Completed on ${task.dateCompleted}` : `Added on ${task.dateAdded}`}`;
    taskItem.appendChild(taskContent);

    if (!task.completed) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => completeTask(taskItem, task);
        taskItem.appendChild(completeButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => deleteTask(taskItem, task);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function saveTask(task) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.text === task.text && t.dateAdded === task.dateAdded);
    if (taskIndex > -1) {
        tasks[taskIndex] = task;
    } else {
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(t => !(t.text === task.text && t.dateAdded === task.dateAdded));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}
