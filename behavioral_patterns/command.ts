// Command Pattern
// This pattern encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
// It also provides support for undoable operations.
// https://refactoring.guru/design-patterns/command

/**
 * Command is an interface that defines a method for executing a command.
 * It allows different commands to be executed without knowing the details of how they are implemented.
 * This is the Command interface in the Command Pattern.
 */
interface Command {
  execute(): void;
}

/**
 * CopyCommand is a concrete implementation of the Command interface.
 * It represents a command to copy text.
 * When executed, it performs the action of copying text.
 * This is a Concrete Command in the Command Pattern.
 */
class CopyCommand implements Command {
  execute() {
    console.log('Copying text...');
  }
}

/**
 * CutCommand is a concrete implementation of the Command interface.
 * It represents a command to cut text.
 * When executed, it performs the action of cutting text.
 * This is a Concrete Command in the Command Pattern.
 */
class CutCommand implements Command {
  execute() {
    console.log('Cutting text...');
  }
}

/**
 * PasteCommand is a concrete implementation of the Command interface.
 * It represents a command to paste text.
 * When executed, it performs the action of pasting text.
 * This is a Concrete Command in the Command Pattern.
 */
class PasteCommand implements Command {
  execute() {
    console.log('Pasting text...');
  }
}

/**
 * CopyButton is a class that represents a button for copying text.
 * It has a reference to a Command object that it executes when clicked.
 * This allows the button to perform the copy action without knowing the details of how it is implemented.
 * This is a Receiver in the Command Pattern.
 */
class CopyButton {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

/**
 * CopyShortcut is a class that represents a keyboard shortcut for copying text.
 * It has a reference to a Command object that it executes when the shortcut is pressed.
 * This allows the shortcut to perform the copy action without knowing the details of how it is implemented.
 * This is a Receiver in the Command Pattern.
 */
class CopyShortcut {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

/**
 * CutButton is a class that represents a button for cutting text.
 * It has a reference to a Command object that it executes when clicked.
 * This allows the button to perform the cut action without knowing the details of how it is implemented.
 * This is a Receiver in the Command Pattern.
 */
class CutButton {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

/**
 * CutShortcut is a class that represents a keyboard shortcut for cutting text.
 * It has a reference to a Command object that it executes when the shortcut is pressed.
 * This allows the shortcut to perform the cut action without knowing the details of how it is implemented.
 * This is a Receiver in the Command Pattern.
 */
class CutShortcut {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

/**
 * PasteButton is a class that represents a button for pasting text.
 * It has a reference to a Command object that it executes when clicked.
 * This allows the button to perform the paste action without knowing the details of how it is implemented.
 * This is a Receiver in the Command Pattern.
 */
class PasteButton {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

/**
 * PasteShortcut is a class that represents a keyboard shortcut for pasting text.
 * It has a reference to a Command object that it executes when the shortcut is pressed.
 * This allows the shortcut to perform the paste action without knowing the details of how it is implemented.
 * This is a Receiver in the Command Pattern.
 */
class PasteShortcut {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

/**
 * App is a class that demonstrates the Command Pattern.
 * It creates instances of CopyButton, CutButton, PasteButton, and their respective shortcuts,
 * and executes their commands when the buttons are clicked or shortcuts are pressed.
 * This is the Client in the Command Pattern.
 */
class App {
  private copyButton: CopyButton;
  private copyShortcut: CopyShortcut;
  private cutButton: CutButton;
  private cutShortcut: CutShortcut;
  private pasteButton: PasteButton;
  private pasteShortcut: PasteShortcut;

  constructor() {
    const copyCommand = new CopyCommand();
    const cutCommand = new CutCommand();
    const pasteCommand = new PasteCommand();

    this.copyButton = new CopyButton(copyCommand);
    this.copyShortcut = new CopyShortcut(copyCommand);
    this.cutButton = new CutButton(cutCommand);
    this.cutShortcut = new CutShortcut(cutCommand);
    this.pasteButton = new PasteButton(pasteCommand);
    this.pasteShortcut = new PasteShortcut(pasteCommand);
  }

  run() {
    this.copyButton.click();
    this.cutButton.click();
    this.pasteButton.click();
    this.copyShortcut.press();
    this.cutShortcut.press();
    this.pasteShortcut.press();
  }
}

// Example usage
// Create an instance of App and run it to demonstrate the Command Pattern.
// This shows how commands can be encapsulated and executed without the client
// needing to know the details of their implementation.

const app = new App();
app.run();
