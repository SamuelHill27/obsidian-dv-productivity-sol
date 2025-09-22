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

const handleTaskTime = (task) => {
	// tasks with time have due attribute in string format
	if (typeof task.due == "string") {
		task.due = dv.date(task.due.replace(' ', 'T')); // yyyy-MMM-dd HH:mm -> T between date and time is ISO format
	}

	// set time of tasks without time to latest time to prioritize tasks with time when sorted
	if (task.due.hour == 0 && task.due.minute == 0) {
		task.due = task.due.set({ hour: 23, minute: 59 });
	}
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
let tasks = dv.pages(`"${taskDirs.join('" or "')}"`).file.tasks
	.where(task => !task.completed && task.due)
	.filter(task => !isGroupedTask(task))

tasks.forEach(task => handleTaskTime(task));

const isTasksToday = displayTasks("Today", tasks
	.where(task => task.due <= today)
	.sort(task => task.due, "asc"));

isTasksToday ? null : dv.paragraph("No tasks today. Yay!");

const yesterday = today.minus({ days: 1 }).toFormat("yyyy-MM-dd");
dv.span(`<-- [[${yesterday}|Yesterday]]`);

const isTasksTomorrow = displayTasks("Tomorrow", tasks
	.where(task => task.due > today && task.due <= today.plus({ days: 1 }))
	.sort(task => task.due, "asc"));

const isTasksThisWeek = displayTasks("This Week", tasks
	.where(task => task.due > today.plus({ days: 1 }) && task.due <= today.plus({ days: 7 }))
	.sort(task => task.due, "asc"));

isTasksTomorrow || isTasksThisWeek ? null : dv.paragraph("No tasks this week. Yay!");

dv.span("<-- [[Schedule]] ");