const tasks = dv.pages('"Daily/Days"').file.tasks
	.where(p => !p.completed && p.due)
	.sort(p => p.due, 'desc');

if (tasks.length !== 0) {
	dv.taskList(tasks, false);
} else {
	dv.paragraph("<i>Nothing due. Yay!</i>");
}