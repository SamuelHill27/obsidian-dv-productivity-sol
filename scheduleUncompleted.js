const taskDirs = [dv.current().file.folder, "Current", "Projects"];

let tasks = dv.pages(`"${taskDirs.join('" or "')}"`).file.tasks
	.where(task => !task.completed && task.due)
	.sort(task => task.due, "asc");

if (tasks.length !== 0) {
	dv.taskList(tasks, false);
} else {
	dv.paragraph("<i>Nothing due. Yay!</i>");
}