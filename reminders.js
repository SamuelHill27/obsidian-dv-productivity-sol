const permanentRootNotes = ['Home', 'Scratch'];

const rootNotes = dv.pages().where(p => p.file.folder === ""); // empty string is the root folder
const roughNotes = rootNotes.where(p => !permanentRootNotes.includes(p.file.name));

for (const note of roughNotes) {
    const link = dv.el("a", dv.fileLink(note.file.path, true));
    link.style.cssText = `
        text-decoration: none;
        color: inherit;
    `;
    
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const file = app.vault.getAbstractFileByPath(note.file.path);
        if (file) {
            app.workspace.getLeaf().openFile(file);
        }
    });
    
    dv.span(link);
    dv.paragraph("");
}