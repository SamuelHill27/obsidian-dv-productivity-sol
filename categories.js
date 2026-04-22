// Get all folders in the Wiki directory
const wikiFolders = dv.pages('"Wiki"')
  .where(p => p.file.folder !== ''); // Ensure it's a folder

// Create a set to store unique folder names
const folderSet = new Set();

// Iterate through each folder to find files with the same name as the folder
for (const folder of wikiFolders) {
  const folderName = folder.file.folder.split('/').pop(); // Get the folder name
  folderSet.add(folderName);
}

// Find files in the Wiki directory that have the same name as their folder
const matchingFiles = dv.pages('"Wiki"')
  .where(p => folderSet.has(p.file.name))
  .sort(p => p.file.name.length);

// Split the list of notes into two columns
const half = Math.ceil(matchingFiles.length / 2);
const firstColumn = matchingFiles.slice(0, half).sort(p => p.file.name);
const secondColumn = matchingFiles.slice(half).sort(p => p.file.name);

// Prepare the data for the table
const tableData = firstColumn.map((p, index) => [
  dv.fileLink(p.file.path), // First column file link
  secondColumn[index] ? dv.fileLink(secondColumn[index].file.path) : '' // Second column file link
]);

// Display the table with headers
dv.table(
  ["Wiki", ""],
  tableData
);
