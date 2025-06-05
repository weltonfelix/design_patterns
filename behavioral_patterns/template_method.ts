// Template Method Pattern
// This pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses.
// It lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
// https://refactoring.guru/design-patterns/template-method

/**
 * Notifier is an abstract class that defines the template method notify.
 * It provides a common interface for different types of notifications (e.g., email, SMS).
 */
abstract class Notifier {
  /**
   * The notify method is the template method that defines the steps to notify a user.
   * It calls the prepare method to get the content and then calls the send method to deliver it.
   * @param user The user to notify.
   * @param address The address to send the notification to (e.g., email or phone number).
   * @returns A boolean indicating whether the notification was sent successfully.
   * @throws Error if the user or address is not provided.
   */
  notify(user: string, address: string): boolean {
    if (!user || !address) {
      throw new Error('User and address must be provided');
    }

    const content = this.prepare(user);
    this.send(content, address);
    console.log(`Notification sent to ${user} at ${address}`);

    return true;
  }

  /**
   * The prepare method is responsible for preparing the content of the notification.
   * @param user The user to prepare the notification for.
   * @returns The content of the notification.
   */
  prepare(user: string): string {
    console.log(`Preparing notification for ${user}`);
    return `Hello, ${user}! This is a notification just for you.`;
  }

  /**
   * The send method is an abstract method that must be implemented by subclasses.
   * It defines how the notification will be sent.
   */
  protected abstract send(content: string, address: string): void;
}

/**
 * EmailNotifier is a concrete class that extends Notifier.
 * It implements the send method to send notifications via email.
 */
class EmailNotifier extends Notifier {
  send(content: string, address: string) {
    console.log(`Sending email to ${address} with content: ${content}`);
    console.log(`Building email template...`);
    console.log(`Queuing email for delivery...`);
    console.log(`Contacting SMTP server...`);
    console.log(`Email sent successfully!`);
  }
}

/**
 * SMSNotifier is a concrete class that extends Notifier.
 * It implements the send method to send notifications via SMS.
 */
class SMSNotifier extends Notifier {
  send(content: string, address: string) {
    console.log(`Sending SMS to ${address} with content: ${content}`);
    console.log(`Building SMS template...`);
    console.log(`Queuing SMS for delivery...`);
    console.log(`Contacting SMS gateway...`);
    console.log(`SMS sent successfully!`);
  }
}

// Example usage
// Create instances of EmailNotifier and SMSNotifier and use them to send notifications.
// You can easily extend this to add more types of notifications (e.g., push notifications) by creating new subclasses of Notifier.
// This allows you to add new notification types without changing the existing code, adhering to the Open/Closed Principle.

const emailNotifier = new EmailNotifier();
const smsNotifier = new SMSNotifier();

emailNotifier.notify('Alice', 'alice@yourmail.com');
console.log('---');
smsNotifier.notify('Bob', '+1234567890');
console.log('---');
smsNotifier.notify('Alice', '+0987654321');
