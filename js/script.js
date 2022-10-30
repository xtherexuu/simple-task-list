{
    const tasks = [];
    let hiddenTaskStatus = "";
    const toggleDoneAllTasksButtonElement = document.querySelector(".js-toggleDoneAllTasks");

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
        if (toggleDoneAllTasksButtonElement.innerText === "Zaznacz wszystkie") {
            for (const task in tasks) {
                tasks[task].done = true;
            }

            toggleDoneAllTasksButtonElement.innerText = "Odznacz Wszystkie";
        } else {
            for (const task in tasks) {
                tasks[task].done = false;
            }

            toggleDoneAllTasksButtonElement.innerText = "Zaznacz wszystkie";
        }

        render();
    };

    const checkIfAllTaskDoneOrNot_ifYes_switchButtonName = () => {
        const allTasksChecked = tasks.every((tasks) => tasks.done === true);
        const allTasksUnchecked = tasks.every((tasks) => tasks.done === false);

        if (allTasksChecked) {
            toggleDoneAllTasksButtonElement.innerText = "Odznacz Wszystkie";
        } else if (allTasksUnchecked) {
            toggleDoneAllTasksButtonElement.innerText = "Zaznacz wszystkie";
        } else {
            return;
        }
    };

    const addNewTask = (newTaskElement) => {
        tasks.push({ task: `${newTaskElement.value.trim()}`, done: false });
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
        tasks.splice(taskIndex, 1);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        checkIfAllTaskDoneOrNot_ifYes_switchButtonName();
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

    const render = () => {
        const tasksList = document.querySelector(".js-tasks");
        let htmlString = "";

        for (const task in tasks) {
            htmlString += `
    <li class="list__item js-listItem${tasks[task].done ? hiddenTaskStatus : ""}"><button class="list__button list__button--toggleDoneTask js-toggleDoneTaskButton">${tasks[task].done ? "✔" : ""}</button><span class="list__itemText${tasks[task].done ? " list__itemText--taskDone" : ""}">${tasks[task].task}</span><button class="list__button list__button--removeTask js-removeTaskButton">🗑</button></li>`;
        }

        tasksList.innerHTML = htmlString;

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);

        bindEvents();
    };

    const init = () => {
        const toggleDoneTasksVisibilityButtonElement = document.querySelector(".js-toggleDoneTasksVisibility");

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
