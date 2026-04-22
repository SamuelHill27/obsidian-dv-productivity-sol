// Globals

// Functions
const getTableHeader = (dir) => {
	const dirName = dir.split('/').pop();
	return `[[${dir}/${dirName}|${dirName}]]`;
}

const getPages = (dir) => {
    return dv.pages(`"${dir}"`)
        .filter((p) => p.file.folder == dir && p.file.name != dir.split('/').pop())
        .sort((p) => p.file.name, "asc")
        .map((p) => p.file.link);
}

const getSubDirs = (dir) => {
  return dv.pages(`"${dir}"`)
    .filter(p => p.file.name == p.file.folder.split('/').pop() && p.file.name != dir)
    .sort(p => p.file.name, "asc")
    .map(p => p.file.folder);
}

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

// Main
const wikiMocs = getSubDirs("Wiki");
for (let i = 0; i < wikiMocs.length; i += 2) {
  console.log(wikiMocs);
  dv.table([getTableHeader(wikiMocs[i]), getTableHeader(wikiMocs[i+1])],
    format(getPages(wikiMocs[i]), getPages(wikiMocs[i+1])));
}