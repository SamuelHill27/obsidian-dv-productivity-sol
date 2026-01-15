dirs = ["Current", "Projects", "Wiki", "Uni Notes"];

const format = (pageLinks) => {
    const table = [];

    for (let i = 0; i < pageLinks.length; i += 2) {
        const first = pageLinks.values[i];
        const second = pageLinks.values[i + 1] || "";
        table.push([first, second]);
    }

    return table;
};

const display = (dir) => {const dir1 = "Wiki";
const dir2 = "Projects";
    const pages = dv.pages(`"${dir}"`);
    let pageLinks = pages
        .filter((p) => p.file.folder == dir && p.file.name != dir)
        .sort((p) => p.file.ctime, "asc")
        .map((p) => p.file.link);

    const folderNames = new Set(
        pages.map((p) => p.file.folder.split("/").pop())
    );
    if (folderNames.size > 1) {
        pageLinks = pageLinks.concat(
            pages
                .filter((p) => folderNames.has(p.file.name))
                .sort((p) => p.file.ctime, "asc")
                .map((p) => p.file.link)
        );
    }

    const mocPage = pages.filter((p) => p.file.name == dir);
    let mocLink, mocLinkDisplay = "-->";
    if (mocPage.first()) {
        mocLink = `[[${mocPage.first().file.path}|${mocLinkDisplay}]]`;
    }

    dv.table([dir, mocLink], format(pageLinks));
};

for (const dir of dirs) {
    display(dir);
}
