// Globals
const rtf = new Intl.RelativeTimeFormat("en", { 
	style: "long", 
	numeric: 'auto' 
});

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

// Main
const folderName = dv.current().file.folder.split('/').pop();
const recents = dv.pages(`"${dv.current().file.folder}"`)
	.filter(p => p.file.mtime && p.file.name != folderName)
	.sort(p => p.file.mtime, "desc")
	.slice(0, 3);

const table = dv.markdownTable(
	["Note", "Last Modified"], 
	recents.map(p => [p.file.link, getRelDate(dv.date(p.file.mtime))])
);

dv.paragraph(table);