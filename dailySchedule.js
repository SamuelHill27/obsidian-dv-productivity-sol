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
	if (tasks.length > 0) {
		dv.header(2, headerText)
		dv.taskList(tasks, false); // false: don't group by file
		return true;
	}
	return false;
}

// Main
let tasks = dv.pages(`"${taskDirs.join('" or "')}"`).file.tasks
	.where(t => !t.completed && t.due)
	.filter(t => !isGroupedTask(t))

// set tasks without time to latest time to prioritize tasks with time when sorted
const isTimeSet = (task) => 
	!(task.due.hour == 23 && task.due.minute == 59) && // default time after resetting?
	!(task.due.hour == 0 && task.due.minute == 0); // default time before resetting
tasks.forEach(t => !isTimeSet(t) ? t.due = t.due.set({ hour: 23, minute: 59 }) : null);

const isTasksToday = displayTasks("Today", tasks
	.where(task => task.due <= today)
	.sort(t => t.due, "asc"));

isTasksToday ? null : dv.paragraph("No tasks today. Yay!");

const yesterday = today.minus({ days: 1 }).toFormat("yyyy-MM-dd");
dv.span(`<-- [[${yesterday}|Yesterday]]`);

const isTasksTomorrow = displayTasks("Tomorrow", tasks
	.where(task => task.due > today && task.due <= today.plus({ days: 1 }))
	.sort(t => t.due, "asc"));

const isTasksThisWeek = displayTasks("This Week", tasks
	.where(task => task.due > today.plus({ days: 1 }) && task.due <= today.plus({ days: 7 }))
	.sort(t => t.due, "asc"));

isTasksTomorrow || isTasksThisWeek ? null : dv.paragraph("No tasks this week. Yay!");

dv.span("<-- [[Schedule]] ");