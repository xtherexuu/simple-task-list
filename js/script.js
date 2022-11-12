{
    let tasks = [];
    let hiddenTaskStatus = "";
    const toggleDoneAllTasksButtonElement = document.querySelector(".js-toggleDoneAllTasks");
    const toggleDoneTasksVisibilityButtonElement = document.querySelector(".js-toggleDoneTasksVisibility");

    const toggleDoneTasksVisibility = (toggleDoneTasksVisibilityButtonElement) => {
        if (toggleDoneTasksVisibilityButtonElement.innerText === "Ukryj ukończone") {
            toggleDoneTasksVisibilityButtonElement.innerText = "Pokaż Ukończone";
            hiddenTaskStatus = " list__item--hidden";
            return render();
        } else {
            toggleDoneTasksVisibilityButtonElement.innerText = "Ukryj ukończone";
            hiddenTaskStatus = "";
            return render();
        }
    };

    const toggleDoneAllTasks = () => {
        tasks = tasks.map((task) => {
            return { task: task.task, done: true };
        });

        render();
    };

    const toggleAllTasksDoneButtonName = () => {
        const allTasksChecked = tasks.every((tasks) => tasks.done === true);

        if (allTasksChecked) {
            toggleDoneAllTasksButtonElement.disabled = true;
        } else {
            toggleDoneAllTasksButtonElement.disabled = false;
        }
    };

    const addNewTask = (newTaskElement) => {
        tasks = [...tasks, { task: `${newTaskElement.value.trim()}`, done: false }];
        newTaskElement.value = "";
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");

        if (!newTaskElement.value.trim()) {
            newTaskElement.value = "";
            return newTaskElement.focus();
        }

        addNewTask(newTaskElement);
        return newTaskElement.focus();
    };

    const removeTask = (taskIndex) => {
        tasks = [...tasks.slice(0, +taskIndex), ...tasks.slice(+taskIndex + 1)];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task) => {
            if (tasks.indexOf(task) === taskIndex) {
                return { task: task.task, done: !task.done };
            } else {
                return { task: task.task, done: task.done };
            }
        });
        render();
    };

    const bindEvents = () => {
        const removeTaskButton = document.querySelectorAll(".js-removeTaskButton");

        removeTaskButton.forEach((removeTaskButton, index) => {
            removeTaskButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtonElement = document.querySelectorAll(".js-toggleDoneTaskButton");

        toggleDoneButtonElement.forEach((toggleDoneButtonElement, index) => {
            toggleDoneButtonElement.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderList = () => {
        const tasksList = document.querySelector(".js-tasks");
        let htmlString = "";

        for (const task in tasks) {
            htmlString += `
    <li class="list__item js-listItem${tasks[task].done ? hiddenTaskStatus : ""}"><button class="list__button list__button--toggleDoneTask js-toggleDoneTaskButton">${tasks[task].done ? "✔" : ""}</button><span class="list__itemText${tasks[task].done ? " list__itemText--taskDone" : ""}">${tasks[task].task}</span><button class="list__button list__button--removeTask js-removeTaskButton">🗑</button></li>`;
        }

        tasksList.innerHTML = htmlString;

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    const renderButtons = () => {
        switch (tasks.length) {
            case 0:
                return toggleDoneAllTasksButtonElement.classList.add("div__helpButton--hidden"), toggleDoneTasksVisibilityButtonElement.classList.add("div__helpButton--hidden");
            default:
                return toggleDoneAllTasksButtonElement.classList.remove("div__helpButton--hidden"), toggleDoneTasksVisibilityButtonElement.classList.remove("div__helpButton--hidden");
        }
    };

    const render = () => {
        renderList();
        renderButtons();
        bindEvents();
        toggleAllTasksDoneButtonName();
    };

    const init = () => {
        render();

        toggleDoneAllTasksButtonElement.addEventListener("click", () => {
            toggleDoneAllTasks();
        });

        toggleDoneTasksVisibilityButtonElement.addEventListener("click", () => {
            toggleDoneTasksVisibility(toggleDoneTasksVisibilityButtonElement);
        });
    };

    init();
}
