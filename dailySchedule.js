// Globals
const today = dv.date(dv.current().file.name);
const taskDirs = [dv.current().file.folder, "Current", "Projects"];

// Functions
const isGroupedTask = (task) => {
	const groupsDir = "Daily/Fleeting/Groups";
	
	const groupedTaskDates = dv.date(dv.pages(`"${groupsDir}"`).file.lists.text);
	
	const isTaskInGroup = groupedTaskDates.some(date => dv.equal(date, task.due));
	
	let taskIsGroup = false;
	if (task.outlinks.length > 0) {
		taskIsGroup = task.outlinks[0].path.includes(groupsDir);
	}
	
	return isTaskInGroup && !taskIsGroup;
}

const displayTasks = (headerText, tasks) => {
	if (tasks.length > 0) {
		dv.header(2, headerText)
		dv.taskList(tasks, false); // false: don't group by file
		return true;
	}
	return false;
}

// Main
const tasks = dv.pages(`"${taskDirs.join('" or "')}"`).file.tasks
	.where(p => !p.completed && p.due)
	.sort(p => p.due, 'asc')
	.filter(p => !isGroupedTask(p));

displayTasks("Today", tasks.where(task => task.due <= today)) ? null : dv.paragraph("No tasks today. Yay!");

const yesterday = today.minus({ days: 1 }).toFormat("yyyy-MM-dd");
dv.span(`<-- [[${yesterday}|Yesterday]]`);

const isTasksTomorrow = displayTasks("Tomorrow", tasks.where(task => task.due > today && task.due <= today.plus({ days: 1 })));

const isTasksThisWeek = displayTasks("This Week", tasks.where(task => task.due > today.plus({ days: 1 }) && task.due <= today.plus({ days: 7 })));

isTasksTomorrow || isTasksThisWeek ? null : dv.paragraph("No tasks this week. Yay!");

dv.span("<-- [[Schedule]] ");