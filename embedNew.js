const permanentRootNotes = ['Home'];

const rootNotes = dv.pages().where(p => p.file.folder === ""); // empty string is the root folder

const roughNotes = rootNotes.where(p => !permanentRootNotes.includes(p.file.name));

for (const note of roughNotes) {
    dv.span(dv.fileLink(note.file.path, true));
}