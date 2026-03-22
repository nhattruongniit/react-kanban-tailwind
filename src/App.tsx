import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  assignees: { name: string; avatar: string }[];
  daysLeft?: number;
  image?: string;
  isDone?: boolean;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    startDate: '',
    dueDate: '',
    category1: 'Design',
    category2: 'Sprint'
  });
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: ''
  });

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'Change charts javascript',
          description: 'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' },
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          daysLeft: 5
        },
        {
          id: 2,
          title: 'Change homepage',
          description: 'Change homepage for Volt Dashboard.',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' }
          ],
          image: 'https://flowbite.com/application-ui/demo/images/kanban/task-4-dark.png',
          daysLeft: 22
        },
        {
          id: 3,
          title: 'Update dependencies',
          description: 'Update all npm packages to their latest stable versions.',
          assignees: [
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          daysLeft: 7
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: 4,
          title: 'Redesign tables card',
          description: 'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' }
          ],
          image: 'https://flowbite.com/application-ui/demo/images/kanban/task-1-dark.jpg',
          daysLeft: 9
        },
        {
          id: 5,
          title: 'Fix responsive issues',
          description: 'Resolve mobile view problems on the dashboard page.',
          assignees: [
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' }
          ],
          daysLeft: 3
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 6,
          title: 'Redesign tables card',
          description: 'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          image: 'https://flowbite.com/application-ui/demo/images/kanban/task-2-dark.jpg',
          isDone: true
        },
        {
          id: 7,
          title: 'Create Javascript elements',
          description: 'Complete the implementation of dynamic form elements.',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' }
          ],
          isDone: true
        }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">HVAC Editor</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* input search */}
            <div>
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search tasks..."
                  className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700 uppercase">
                  {column.title}
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {column.tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    {/* Task Image */}
                    {task.image && (
                      <img
                        src={task.image}
                        alt={task.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}

                    {/* Task Title */}
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {task.title}
                    </h3>

                    {/* Task Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Task Footer */}
                    <div className="flex items-center justify-between">
                      {/* Assignees */}
                      <div className="flex -space-x-2">
                        {task.assignees.map((assignee, index) => (
                          <img
                            key={index}
                            src={assignee.avatar}
                            alt={assignee.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            title={assignee.name}
                          />
                        ))}
                      </div>

                      {/* Days Left / Status */}
                      {task.isDone ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Done
                        </span>
                      ) : task.daysLeft !== undefined && (
                        <span className="text-xs text-gray-500">
                          {task.daysLeft} day{task.daysLeft !== 1 ? 's' : ''} left
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add New Task Button */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 border-dashed rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
                >
                  + Add new task
                </button>
              </div>
            </div>
          ))}

          {/* Add Another Group */}
          <div className="flex-shrink-0 w-80">
            <button 
              onClick={() => setIsGroupModalOpen(true)}
              className="w-full py-8 text-sm font-medium text-gray-500 bg-white border border-gray-200 border-dashed rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              + Add another group
            </button>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900 opacity-50 transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add new task</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Add title here"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    {/* Toolbar */}
                    <div className="flex items-center space-x-2 mb-2 px-2 py-1 bg-gray-50 rounded-t-lg border border-gray-300 border-b-0">
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </button>
                      <button className="ml-auto p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                    <textarea
                      placeholder="Write a description here"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-b-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Assignee & Communication */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignee & Communication
                    </label>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex -space-x-2">
                        <img
                          src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
                          alt="User"
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        <img
                          src="https://flowbite.com/application-ui/demo/images/users/roberta-casas.png"
                          alt="User"
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-700">
                          +9
                        </div>
                      </div>
                      <button className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add member
                      </button>
                    </div>
                    <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                      </svg>
                      Add Google Meet video conference
                    </button>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['High', 'Medium', 'Low', 'Lowest'].map((priority) => (
                        <label key={priority} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newTask.priority === priority.toLowerCase()}
                            onChange={() => setNewTask({ ...newTask, priority: priority.toLowerCase() })}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{priority}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={newTask.startDate}
                          onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                        <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </label>
                      <select
                        value={newTask.category1}
                        onChange={(e) => setNewTask({ ...newTask, category1: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Design</option>
                        <option>Development</option>
                        <option>Testing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                        <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </label>
                      <select
                        value={newTask.category2}
                        onChange={(e) => setNewTask({ ...newTask, category2: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Sprint</option>
                        <option>Backlog</option>
                        <option>Epic</option>
                      </select>
                    </div>
                  </div>

                  {/* Deadline notification */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline notification
                    </label>
                    <div className="flex gap-2">
                      <select className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Notification</option>
                        <option>Email</option>
                        <option>SMS</option>
                      </select>
                      <input
                        type="number"
                        defaultValue="1"
                        className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select className="w-28 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Days</option>
                        <option>Hours</option>
                        <option>Weeks</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-start space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add new task
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* div>
      </div>

      {/* Add Group Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900 opacity-50 transition-opacity"
            onClick={() => setIsGroupModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add new group</h3>
                <button
                  onClick={() => setIsGroupModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Add title here"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Add a description here"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-start space-x-3 mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add new task
                </button>
                <button
                  onClick={() => setIsGroupModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>© 2025 Flowbite. All rights reserved.</span>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">API</a>
              <a href="#" className="hover:text-gray-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
