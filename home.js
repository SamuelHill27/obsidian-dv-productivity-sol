// Globals
const dir2 = "Current";
const dir1 = "Wiki";
const dir3 = "Projects";

// Functions
const format = (pageLinks1, pageLinks2) => {
  const table = [];
	const tableDepth = Math.max(pageLinks1.length, pageLinks2.length);
    for (let i = 0; i < tableDepth; i++) {
        const first = pageLinks1.values[i] || "";
        const second = pageLinks2.values[i] || "";
        table.push([first, second]);
    }
    return table;
};

const getMocs = (dir) => {
	return dv.pages(`"${dir}"`)
        .filter(p => p.file.name == p.file.folder.split('/').pop() && p.file.name != dir)
        .sort(p => p.file.name, "asc")
        .map(p => p.file.link);
}

const getPages = (dir) => {
    return dv.pages(`"${dir}"`)
        .filter((p) => p.file.folder == dir && p.file.name != dir)
        .sort((p) => p.file.name, "asc")
        .map((p) => p.file.link);
}

const getTableHeader = (dir) => {
	const dirName = dir.split('/').pop();
	return `[[${dir}/${dirName}|${dirName}]]`;
}

// Main
dv.table([getTableHeader(dir1), getTableHeader(dir2)],
    format(getMocs(dir1), getPages(dir2)));

dv.table([getTableHeader(dir3)], 
    format(getMocs(dir3), []));