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
const contentOutlinks = bulletedListItems.map(bli => bli.outlinks)
	.filter(ol => ol.length > 0) // only keep items with outlinks
	.filter(ol => ol[0].display == ol[0].path); // don't include MoCs
const contentOutlinksNames = contentOutlinks.map(col => col[0].display);

// get all page names
const contentPages = dv.pages(`"${dv.current().file.folder}"`).file.filter(p => p.folder == dv.current().file.folder);
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