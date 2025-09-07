// Globals

// Functions
const display = (contentNames, contentType) => {
	if (contentNames.length > 0) {
		dv.header(2, `<span style="color: Red;">${contentType}</span>`);
		dv.span(contentNames);
		return true;
	}
	return false;
}

// Main
// get all outlink names
const bulletedListItems = dv.current().file.lists.filter(l => !l.task);
const contentOutlinks = bulletedListItems.map(bli => bli.outlinks).filter(ol => ol.length > 0);
const contentOutlinksNames = contentOutlinks.map(col => col[0].path);

// get all page names
const contentPages = dv.pages(`"${dv.current().file.folder}"`).file;
const contentPagesNames = contentPages.map(cp => cp.name).filter(cpn => cpn != dv.current().file.name);

// orphaned
const orphaned = contentPagesNames.filter(cpn => !contentOutlinksNames.includes(cpn));

// moved
const moved = contentOutlinksNames.filter(coln => !contentPagesNames.includes(coln));

// normal
if (!display(orphaned, "Orphaned") && !display(moved, "Moved")) {
	const text = "Notes and Links Bijective (1 to 1 mapping)";
	dv.span(`<span style="color: Grey;">${text}</span>`);
}