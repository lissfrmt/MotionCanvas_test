import * as fs from "fs";

// Regular expression to match file names
const regex: RegExp = /^block\d+\.lesson\d+\.ts/;

// Function to return list of file paths
export function getProjects(dirPath: string): string[] {
  const fileNames = fs.readdirSync(dirPath, { withFileTypes: true });
  const filePaths = fileNames.flatMap((file) => {
    const fullPath = `${dirPath}/${file.name}`;
    if (file.isDirectory()) {
      return getProjects(fullPath);
    } else if (file.isFile() && regex.test(file.name)) {
      return fullPath;
    } else {
      return [];
    }
  });
  return filePaths;
}
