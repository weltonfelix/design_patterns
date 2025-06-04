interface Command {
  execute(): void;
}

class CopyCommand implements Command {
  execute() {
    console.log('Copying text...');
  }
}

class CutCommand implements Command {
  execute() {
    console.log('Cutting text...');
  }
}

class PasteCommand implements Command {
  execute() {
    console.log('Pasting text...');
  }
}

class CopyButton {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

class CopyShortcut {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

class CutButton {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

class CutShortcut {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

class PasteButton {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

class PasteShortcut {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  press() {
    this.command.execute();
  }
}

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

const app = new App();
app.run();
