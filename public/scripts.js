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
    li.textContent = `${task.name}: ${task.description} (${task.status})`;
    taskList.appendChild(li);
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
