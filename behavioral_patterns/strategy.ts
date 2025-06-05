// Strategy Pattern
// The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.
// It lets the algorithm vary independently from clients that use it.
// https://refactoring.guru/design-patterns/strategy

/**
 * CipherStrategy is an interface that defines the methods for encryption and decryption.
 * It allows different cipher algorithms to be implemented and used interchangeably.
 * This is the Strategy interface in the Strategy Pattern.
 */
interface CipherStrategy {
  encrypt(text: string): string;
  decrypt(text: string): string;
}

/**
 * CaesarCipher is a concrete implementation of the CipherStrategy interface.
 * It implements the Caesar cipher algorithm for encryption and decryption.
 * This is one of the concrete strategies in the Strategy Pattern.
 */
class CaesarCipher implements CipherStrategy {
  private shift: number;

  constructor(shift: number) {
    this.shift = shift;
  }

  encrypt(text: string): string {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = char.toLowerCase() === char ? 97 : 65;
        return String.fromCharCode(((code - base + this.shift) % 26) + base);
      }
      return char;
    }).join('');
  }

  decrypt(text: string): string {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = char.toLowerCase() === char ? 97 : 65;
        return String.fromCharCode(((code - base - this.shift + 26) % 26) + base);
      }
      return char;
    }).join('');
  }
}

/**
 * VigenereCipher is another concrete implementation of the CipherStrategy interface.
 * It implements the Vigenère cipher algorithm for encryption and decryption.
 * This is another concrete strategy in the Strategy Pattern.
 */
class VigenereCipher implements CipherStrategy {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  encrypt(text: string): string {
    let result = '';
    for (let i = 0, j = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = char.toLowerCase() === char ? 97 : 65;
        const keyChar = this.key[j % this.key.length].toLowerCase();
        const keyCode = keyChar.charCodeAt(0) - 97;
        result += String.fromCharCode(((code - base + keyCode) % 26) + base);
        j++;
      } else {
        result += char;
      }
    }
    return result;
  }

  decrypt(text: string): string {
    let result = '';
    for (let i = 0, j = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = char.toLowerCase() === char ? 97 : 65;
        const keyChar = this.key[j % this.key.length].toLowerCase();
        const keyCode = keyChar.charCodeAt(0) - 97;
        result += String.fromCharCode(((code - base - keyCode + 26) % 26) + base);
        j++;
      } else {
        result += char;
      }
    }
    return result;
  }
}

/**
 * TextCipher is a context class that uses a CipherStrategy to perform encryption and decryption.
 * It allows the strategy to be changed at runtime, making it flexible and extensible.
 * This is the Context in the Strategy Pattern.
 */
class TextCipher {
  private strategy: CipherStrategy;

  constructor(strategy: CipherStrategy) {
    this.strategy = strategy;
  }

  /**
   * setStrategy allows changing the cipher strategy at runtime.
   * This enables the TextCipher to use different encryption and decryption algorithms without changing its code.
   * This is how the Strategy Pattern allows for dynamic behavior.
   * @param strategy Sets the cipher strategy to be used for encryption and decryption.
   */
  setStrategy(strategy: CipherStrategy): void {
    this.strategy = strategy;
  }

  encrypt(text: string): string {
    return this.strategy.encrypt(text);
  }

  decrypt(text: string): string {
    return this.strategy.decrypt(text);
  }
}

// Example usage
// Create instances of CaesarCipher and VigenereCipher strategies.
// Use them with the TextCipher context to perform encryption and decryption.
// This demonstrates how the Strategy Pattern allows for interchangeable algorithms.

const caesar = new CaesarCipher(3);
const vigenere = new VigenereCipher('KEY');

const textCipher = new TextCipher(caesar);

const encryptedText = textCipher.encrypt('Hello, World!');
console.log(encryptedText); // Khoor, Zruog!
console.log(textCipher.decrypt(encryptedText)); // Hello, World!

textCipher.setStrategy(vigenere);
const vigenereEncrypted = textCipher.encrypt('Hello, World!');
console.log(vigenereEncrypted); // Rijvs, Uyvjn!
console.log(textCipher.decrypt(vigenereEncrypted)); // Hello, World!

// ---

const encrypted = textCipher.encrypt('This is a secret message.');
console.log(encrypted);

textCipher.setStrategy(caesar);
let decrypted = textCipher.decrypt(encrypted);
console.log(decrypted); // ERROR
decrypted = textCipher.encrypt(decrypted);

textCipher.setStrategy(vigenere);
const vigenereDecrypted = textCipher.decrypt(decrypted);
console.log(vigenereDecrypted); // This is a secret message.