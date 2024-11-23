document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const dingSound = document.getElementById("ding-sound"); // Reference to the audio element

    // Function to create a new to-do item
    const addTodo = () => {
        const task = todoInput.value.trim(); // Get the input value and trim whitespace
        if (!task) return alert("Please enter a task!");

        // Create list item
        const li = document.createElement("li");
        li.classList.add("todo-item");

        // Add checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => toggleComplete(li));

        // Add text
        const text = document.createElement("span");
        text.textContent = task;

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => removeTodoItem(li));

        li.append(checkbox, text, deleteButton);
        todoList.appendChild(li);

        // Clear the input field
        todoInput.value = "";
    };

    // Function to mark a task as completed
    const toggleComplete = (item) => {
        if (item.classList.contains("completed")) {
            item.classList.remove("completed");
        } else {
            item.classList.add("completed");
            dingSound.currentTime = 0; // Reset sound to start
            dingSound.play(); // Play the ding sound
            setTimeout(() => todoList.appendChild(item), 300); // Move the item to the bottom
        }
    };

    // Function to remove a to-do item
    const removeTodoItem = (item) => {
        item.classList.add("removed"); // Add a class for the fade-out effect
        setTimeout(() => item.remove(), 500); // Remove the item after fade-out
    };

    // Add event listeners
    addButton.addEventListener("click", addTodo); // Add task on button click
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo(); // Add task on pressing "Enter"
    });
});
