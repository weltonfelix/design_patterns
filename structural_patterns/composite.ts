// Composite Pattern
// The Composite Pattern allows you to compose objects into tree structures to represent part-whole hierarchies.
// It lets clients treat individual objects and compositions uniformly.
// This is useful when you want to represent a hierarchy of objects, such as files and folders in a file system.
// In this example, we will create a file system structure with files and folders
// https://refactoring.guru/design-patterns/composite

/**
 * FileSystemComponent interface defines the common interface for both files and folders.
 * It includes methods to get the name, size, and a method to represent the component as a string.
 * This allows us to treat both files and folders uniformly in the file system structure.
 * This is the Component interface in the Composite Pattern.
 */
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  tree(): string;
}

/**
 * MyFile class implements the FileSystemComponent interface.
 * It represents a file with a name and size.
 * It provides methods to get the name, size, and a string representation of the file.
 * This is a leaf in the Composite Pattern.
 */
class MyFile implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  tree(): string {
    return `${this.name} (${this.size} bytes)`;
  }
}

/**
 * Folder class implements the FileSystemComponent interface.
 * It represents a folder that can contain other files and folders.
 * It provides methods to get the name, size (sum of sizes of all children), and a string representation of the folder structure.
 * This is a composite in the Composite Pattern.
 */
class Folder implements FileSystemComponent {
  private childrenComponents: FileSystemComponent[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  /**
   * getSize method calculates the total size of the folder by summing the sizes of all its children components.
   * It uses recursion to calculate the size of nested folders.
   * @returns The total size of the folder in bytes.
   */
  getSize(): number {
    return this.childrenComponents.reduce(
      (total, child) => total + child.getSize(),
      0
    );
  }
  addComponent(component: FileSystemComponent): void {
    this.childrenComponents.push(component);
  }

  /**
   * tree method returns a string representation of the folder structure.
   * It lists the folder name, its type (Folder), and its size, followed by the tree structure of its children.
   * @returns A string representation of the folder structure.
   */
  tree(): string {
    let result = `- ${this.name} (Folder) (${this.getSize()} bytes)\n`;
    for (const child of this.childrenComponents) {
      result += `|  ${child.tree()}\n`;
    }
    return result;
  }
}

// Example usage of the Composite Pattern to create a file system structure
// and demonstrate how to use the FileSystemComponent interface to interact with files and folders.
// This example creates a folder, adds files to it, and demonstrates the tree structure and size calculations.
// This shows how the Composite Pattern allows for a uniform interface for both files and folders,
// enabling operations like size calculation and tree representation without needing to know the specific type of component.

const myFolder = new Folder('MyFolder');
const myFile1 = new MyFile('file1.txt', 100);
const myFile2 = new MyFile('file2.txt', 200);
const myFile3 = new MyFile('file3.txt', 300);
myFolder.addComponent(myFile1);
myFolder.addComponent(myFile2);

console.log(`Folder name: ${myFolder.getName()}`);
console.log(`Folder size: ${myFolder.getSize()} bytes`);
console.log(`File name: ${myFile1.getName()}`);
console.log(`File size: ${myFile1.getSize()} bytes`);
console.log(`File name: ${myFile2.getName()}`);
console.log(`File size: ${myFile2.getSize()} bytes`);
console.log(`File name: ${myFile3.getName()}`);
console.log(`File size: ${myFile3.getSize()} bytes`);

const mySubFolder = new Folder('MySubFolder');
mySubFolder.addComponent(myFile3);
myFolder.addComponent(mySubFolder);

console.log(`Subfolder name: ${mySubFolder.getName()}`);
console.log(`Subfolder size: ${mySubFolder.getSize()} bytes`);
console.log(`Total size of MyFolder: ${myFolder.getSize()} bytes`);
console.log(`Total size of MySubFolder: ${mySubFolder.getSize()} bytes`);
console.log(`Total size of MyFile1: ${myFile1.getSize()} bytes`);
console.log(`Total size of MyFile2: ${myFile2.getSize()} bytes`);
console.log(`Total size of MyFile3: ${myFile3.getSize()} bytes`);

console.log('Folder structure:');
console.log(myFolder.tree());
console.log('Subfolder structure:');
console.log(mySubFolder.tree());
