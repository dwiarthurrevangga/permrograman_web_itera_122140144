class TaskManager {
  constructor() {
      this.tasks = this.loadTasks();
      this.classes = this.loadClasses();
      this.initElements();
      this.renderTasks();
      this.renderSchedule();
      this.updateStats();
      this.initEventListeners();
      this.startClock();
  }
  
  loadTasks = () => {
      const savedTasks = localStorage.getItem('studentTasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
  }
  
  loadClasses = () => {
      const savedClasses = localStorage.getItem('studentClasses');
      return savedClasses ? JSON.parse(savedClasses) : [];
  }
  
  saveTasks = () => {
      localStorage.setItem('studentTasks', JSON.stringify(this.tasks));
      this.updateStats();
  }
  
  saveClasses = () => {
      localStorage.setItem('studentClasses', JSON.stringify(this.classes));
      this.renderSchedule();
  }
  
  initElements = () => {
      this.taskForm = document.getElementById('taskForm');
      this.classForm = document.getElementById('classForm');
      this.taskList = document.getElementById('taskList');
      this.schedule = document.getElementById('schedule');
      this.taskTitle = document.getElementById('taskTitle');
      this.taskDeadline = document.getElementById('taskDeadline');
      this.taskPriority = document.getElementById('taskPriority');
      this.totalTasksEl = document.getElementById('totalTasks');
      this.urgentTasksEl = document.getElementById('urgentTasks');
      
      this.className = document.getElementById('className');
      this.classLecturer = document.getElementById('classLecturer');
      this.classDay = document.getElementById('classDay');
      this.classStartTime = document.getElementById('classStartTime');
      this.classEndTime = document.getElementById('classEndTime');
      this.classRoom = document.getElementById('classRoom');
      
      this.modal = document.getElementById('editClassModal');
      this.closeModal = document.querySelector('.close');
      this.editClassForm = document.getElementById('editClassForm');
  }
  
  initEventListeners = () => {
      this.taskForm.addEventListener('submit', this.handleAddTask);
      this.classForm.addEventListener('submit', this.handleAddClass);
      
      this.closeModal.addEventListener('click', () => {
          this.modal.style.display = 'none';
      });
      
      window.addEventListener('click', (e) => {
          if (e.target === this.modal) {
              this.modal.style.display = 'none';
          }
      });
      
      this.editClassForm.addEventListener('submit', this.handleEditClass);
  }
  
  handleAddTask = (e) => {
      e.preventDefault();
      
      const newTask = {
          id: Date.now(),
          title: this.taskTitle.value.trim(),
          deadline: this.taskDeadline.value,
          priority: this.taskPriority.value,
          completed: false
      };
      
      this.tasks.push(newTask);
      this.saveTasks();
      this.renderTasks();
      
      this.taskForm.reset();
      this.taskTitle.focus();
  }
  
  handleAddClass = (e) => {
      e.preventDefault();
      
      const newClass = {
          id: Date.now(),
          name: this.className.value.trim(),
          lecturer: this.classLecturer.value.trim(),
          day: this.classDay.value,
          startTime: this.classStartTime.value,
          endTime: this.classEndTime.value,
          room: this.classRoom.value.trim()
      };
      
      this.classes.push(newClass);
      this.saveClasses();
      
      this.classForm.reset();
  }
  
  handleEditClass = (e) => {
      e.preventDefault();
      
      const classId = parseInt(document.getElementById('editClassId').value);
      const classIndex = this.classes.findIndex(c => c.id === classId);
      
      if (classIndex !== -1) {
          this.classes[classIndex] = {
              id: classId,
              name: document.getElementById('editClassName').value.trim(),
              lecturer: document.getElementById('editClassLecturer').value.trim(),
              day: document.getElementById('editClassDay').value,
              startTime: document.getElementById('editClassStartTime').value,
              endTime: document.getElementById('editClassEndTime').value,
              room: document.getElementById('editClassRoom').value.trim()
          };
          
          this.saveClasses();
          this.modal.style.display = 'none';
      }
  }
  
  openEditModal = (classId) => {
      const classToEdit = this.classes.find(c => c.id === classId);
      if (classToEdit) {
          document.getElementById('editClassId').value = classToEdit.id;
          document.getElementById('editClassName').value = classToEdit.name;
          document.getElementById('editClassLecturer').value = classToEdit.lecturer || '';
          document.getElementById('editClassDay').value = classToEdit.day;
          document.getElementById('editClassStartTime').value = classToEdit.startTime;
          document.getElementById('editClassEndTime').value = classToEdit.endTime;
          document.getElementById('editClassRoom').value = classToEdit.room || '';
          
          this.modal.style.display = 'block';
      }
  }
  
  handleDeleteTask = (id) => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
      this.renderTasks();
  }
  
  handleToggleComplete = (id) => {
      this.tasks = this.tasks.map(task => 
          task.id === id ? {...task, completed: !task.completed} : task
      );
      this.saveTasks();
      this.renderTasks();
  }
  
  handleDeleteClass = (classId) => {
      if (confirm('Are you sure you want to delete this class?')) {
          this.classes = this.classes.filter(c => c.id !== classId);
          this.saveClasses();
      }
  }
  
  renderTasks = () => {
      if (this.tasks.length === 0) {
          this.taskList.innerHTML = '<p>No tasks yet. Add your first task!</p>';
          return;
      }
      
      const sortedTasks = [...this.tasks].sort((a, b) => {
          if (a.deadline && b.deadline) {
              return new Date(a.deadline) - new Date(b.deadline);
          }
          return 0;
      });
      
      this.taskList.innerHTML = sortedTasks.map(task => this.renderTask(task)).join('');
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.handleDeleteTask(parseInt(btn.dataset.id));
          });
      });
      
      document.querySelectorAll('.task-item').forEach(item => {
          item.addEventListener('click', () => {
              this.handleToggleComplete(parseInt(item.dataset.id));
          });
      });
  }
  
  renderSchedule = () => {
      if (this.classes.length === 0) {
          this.schedule.innerHTML = '<p>No classes scheduled yet.</p>';
          return;
      }
      
      const classesByDay = this.classes.reduce((acc, cls) => {
          if (!acc[cls.day]) {
              acc[cls.day] = [];
          }
          acc[cls.day].push(cls);
          return acc;
      }, {});
      
      const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const sortedDays = Object.keys(classesByDay).sort((a, b) => {
          return daysOrder.indexOf(a) - daysOrder.indexOf(b);
      });
      
      sortedDays.forEach(day => {
          classesByDay[day].sort((a, b) => {
              return a.startTime.localeCompare(b.startTime);
          });
      });
      
      let scheduleHTML = '';
      
      sortedDays.forEach(day => {
          scheduleHTML += `
              <div class="schedule-day">
                  <h3>${day}</h3>
                  ${classesByDay[day].map(cls => this.renderClassItem(cls)).join('')}
              </div>
          `;
      });
      
      this.schedule.innerHTML = scheduleHTML;
      
      document.querySelectorAll('.edit-class-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.openEditModal(parseInt(btn.dataset.id));
          });
      });
      
      document.querySelectorAll('.delete-class-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.handleDeleteClass(parseInt(btn.dataset.id));
          });
      });
  }
  
  renderTask = (task) => {
      const deadline = task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline';
      const priorityClass = `priority-${task.priority}`;
      
      return `
          <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
              <div class="task-info">
                  <div class="task-title">${task.title}</div>
                  <div class="task-deadline">
                      <span class="task-priority ${priorityClass}">${task.priority.toUpperCase()}</span>
                      ${deadline}
                  </div>
              </div>
              <div class="task-actions">
                  <button class="btn-danger delete-btn" data-id="${task.id}">Delete</button>
              </div>
          </li>
      `;
  }
  
  renderClassItem = (cls) => {
      return `
          <div class="class-item">
              <div class="class-info">
                  <div>
                      <span class="class-time">${cls.startTime} - ${cls.endTime}</span>
                      <strong>${cls.name}</strong>
                  </div>
                  <div>
                      ${cls.lecturer ? `Lecturer: ${cls.lecturer}` : ''}
                      ${cls.room ? ` | Room: ${cls.room}` : ''}
                  </div>
              </div>
              <div class="class-actions">
                  <button class="btn-warning edit-class-btn" data-id="${cls.id}">Edit</button>
                  <button class="btn-danger delete-class-btn" data-id="${cls.id}">Delete</button>
              </div>
          </div>
      `;
  }
  
  updateStats = () => {
      this.totalTasksEl.textContent = this.tasks.length;
      
      const urgentTasks = this.tasks.filter(task => {
          if (!task.deadline || task.completed) return false;
          
          const deadline = new Date(task.deadline);
          const now = new Date();
          const timeDiff = deadline - now;
          const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
          
          return daysDiff < 3;
      });
      
      this.urgentTasksEl.textContent = urgentTasks.length;
  }
  
  startClock = () => {
      const updateClock = () => {
          const now = new Date();
          document.getElementById('clock').textContent = now.toLocaleTimeString() + ' - ' + now.toLocaleDateString();
      };
      
      updateClock();
      setInterval(updateClock, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new TaskManager();
});