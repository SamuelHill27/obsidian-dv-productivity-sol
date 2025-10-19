// Globals
const today = dv.date(dv.current().file.name).set({ hour: 23, minute: 59 });
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
	if (tasks.length <= 0) return false;
	dv.header(2, headerText)
	dv.taskList(tasks.sort(task => task.due, "asc"), false); // false: don't group by file
	return true;
}

// Main
let tasks = dv.pages(`"${taskDirs.join('" or "')}"`).file.tasks
	.where(task => !task.completed && task.due)
	.filter(task => !isGroupedTask(task))

// Display
const isTasksToday = displayTasks("Today", tasks
	.where(task => task.due <= today));

isTasksToday ? null : dv.paragraph("No tasks today. Yay!");

const yesterday = today.minus({ days: 1 }).toFormat("yyyy-MM-dd");
dv.span(`<-- [[${yesterday}|Yesterday]]`);

const isTasksTomorrow = displayTasks("Tomorrow", tasks
	.where(task => task.due > today && task.due <= today.plus({ days: 1 })));

const isTasksThisWeek = displayTasks("This Week", tasks
	.where(task => task.due > today.plus({ days: 1 }) && task.due <= today.plus({ days: 7 })));

isTasksTomorrow || isTasksThisWeek ? null : dv.paragraph("No tasks this week. Yay!");

dv.span("<-- [[Schedule]] ");

