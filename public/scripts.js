document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: taskName, description: taskDescription })
    })
    .then(response => response.json())
    .then(data => {
      addTaskToList(data);
      taskForm.reset();
    })
    .catch(error => console.error('Error:', error));
  });

  function addTaskToList(task) {
    const li = document.createElement('li');
    li.textContent = `${task.name}: ${task.description} (${task.status}) `;
    const statusButton = document.createElement('button');
    statusButton.textContent = 'Change Status';
    statusButton.onclick = function() { changeTaskStatus(task); };
    
    li.appendChild(statusButton);
    taskList.appendChild(li);
 
    if (task.status === 'done') {
        li.classList.add('done-task-class')
    } else if (task.status === 'in progress'){
        li.classList.add('in-progress-task-class')
    }

  }

  function changeTaskStatus(task) {
    taskId = task._id
    const currentStatus = task.status;
    const nextStatus = currentStatus === 'open' ? 'in progress' : currentStatus === 'in progress' ? 'done' : 'open';
    
    fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: nextStatus })
    })
    .then(response => response.json())
    .then(updatedTask => {
        clearTaskList()
        loadTasks()
    })
    .catch(error => console.error('Error:', error));
  }

  function clearTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Wyczyść zawartość listy
  }

  function loadTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(addTaskToList);
    })
    .catch(error => console.error('Error:', error));
  }

  loadTasks();
});
