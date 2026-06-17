function addTask(connection, taskName, taskDescription, dueDate, statusBool, callback) {
    const query = `
        INSERT INTO tasks (name, description, due_date, status_bool)
        VALUES (?, ?, ?,?)
    `
    const dateValue = dueDate ? dueDate : null;
    // the array fills the placeholders '?' in the query
    connection.query(query, [taskName, taskDescription, dateValue, statusBool], callback);
    
};

function getAllTasks(connection, callback) {
    const query = `
    SELECT *
    FROM tasks`;

    connection.query(query, callback);
};

function getTaskById(connection, id, callback) {
    const query = `
    SELECT *
    FROM tasks
    WHERE id = ?`;

    connection.query(query, [id], callback);
}

function updateTask(connection, id, taskName, taskDescription, dueDate, statusBool, callback) {
    const query = `
    UPDATE tasks
    SET name = ?, description = ?, due_date = ?, status_bool = ?
    WHERE id = ?`

    const dateValue = dueDate ? dueDate : null;
    connection.query(query, [taskName, taskDescription, dateValue, statusBool, id], callback);
} 

function deleteTask(connection, id, callback) {
    const query = `
    DELETE FROM tasks
    WHERE id = ?`

    connection.query(query, [id], callback);
}

module.exports = { addTask, getAllTasks, getTaskById, updateTask, deleteTask };
