// Globals
const rtf = new Intl.RelativeTimeFormat("en", { 
	style: "long", 
	numeric: 'auto' 
});

const dirs = ["Current", "Uni Notes", "Wiki", "Projects"];
const num_of_recents = 5;

// Functions
const getRelDatePeriod = (differenceInDays) => {
	const daysInPeriod = [["year", 365], ["month", 30], ["week", 7], ["day", 1]];

	const appropriatePeriod = daysInPeriod
		.map(([periodName, periodCount]) => [periodName, differenceInDays > 0 
			? Math.floor(differenceInDays / periodCount) : 0])
		.filter(([_, periodCount]) => periodCount > 0);

	return appropriatePeriod.length > 0 ? appropriatePeriod.flat() : ["day", 0];
}

const getRelDate = (date) => {
	const differenceInDays = Math.floor((new Date() - date)/8.64e7);
	const [periodName, periodCount] = getRelDatePeriod(differenceInDays);
	return rtf.format(-periodCount, periodName);
}

const titleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Main
const recents = dv.pages(`"${dirs.join('" or "')}"`)
	.filter(p => p.file.name != p.file.folder.split('/').pop())
	.sort(p => p.file.mtime, "desc")
	.slice(0, num_of_recents);

dv.table(
	["Recents", "Last Modified"], 
	recents.map(p => [p.file.link, titleCase(getRelDate(dv.date(p.file.mtime)))])
);