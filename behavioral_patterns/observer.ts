// Observer Pattern
// The Observer Pattern defines a one-to-many dependency between objects so that
// when one object changes state, all its dependents are notified and updated automatically.
// It is often used to implement distributed event handling systems.
// https://refactoring.guru/design-patterns/observer

/**
 * NewsletterListener is an interface that defines the methods for receiving updates
 * from a newsletter. It allows different types of listeners (e.g., readers) to be notified
 * when a new article is published.
 * This is the Observer interface in the Observer Pattern.
 */
interface NewsletterListener {
  /**
   * update is a method that will be called when a new article is published.
   * It receives the article as a parameter and allows the listener to take action,
   * such as displaying the article or notifying the user.
   * This method is called by the Newsletter when a new article is published.
   * @param article The article that has been published.
   */
  update(article: string): void;
}

/**
 * Newsletter is a class that manages a list of subscribers (listeners).
 * It allows listeners to subscribe and unsubscribe from notifications.
 * When a new article is published, it notifies all subscribed listeners.
 * This is the Subject in the Observer Pattern.
 */
class Newsletter {
  /**
   * listeners is an array that holds all the subscribers (listeners)
   * that are interested in receiving updates about new articles.
   * It is used to manage the list of subscribers and notify them when
   * a new article is published.
   */
  listeners: NewsletterListener[] = [];

  /**
   * subscribe is a method that allows a listener to subscribe to the newsletter.
   * When a listener subscribes, it is added to the list of listeners.
   * This method is used to register a listener so that it can receive updates
   * when a new article is published.
   * @param listener is a listener that wants to subscribe to the newsletter.
   */
  subscribe(listener: NewsletterListener) {
    this.listeners.push(listener);
  }

  /**
   * unsubscribe is a method that allows a listener to unsubscribe from the newsletter.
   * When a listener unsubscribes, it is removed from the list of listeners.
   * This method is used to unregister a listener so that it no longer receives updates
   * when a new article is published.
   * @param listener is a listener that wants to unsubscribe from the newsletter.
   */
  unsubscribe(listener: NewsletterListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  /**
   * notify is a method that notifies all subscribed listeners
   * when a new article is published. It iterates through the list of listeners
   * and calls their update method, passing the article as a parameter.
   * This method is used to inform all subscribers about the new article,
   * allowing them to take appropriate action, such as displaying the article.
   * It is called by the Author when a new article is written.
   * @param article is the article that has been published.
   */
  notify(article: string) {
    console.log(`New article published: ${article}`);
    this.listeners.forEach((listener) => listener.update(article));
  }
}

/**
 * Author is a class that represents an author who writes articles.
 * It has a reference to a Newsletter instance and can write articles.
 * When an article is written, it notifies all subscribers of the newsletter.
 * This is the Concrete Subject in the Observer Pattern.
 */
class Author {
  newsletter: Newsletter = new Newsletter();
  private articleCount: number = 0;

  writeArticle(): void {
    console.log('Writing a new article...');
    this.newsletter.notify(`#${++this.articleCount}`);
  }
}

/**
 * Reader is a class that implements the NewsletterListener interface.
 * It represents a reader who subscribes to the newsletter to receive updates
 * about new articles. When a new article is published, it receives a notification
 * and can take action, such as displaying the article.
 * This is a Concrete Observer in the Observer Pattern.
 */
class Reader implements NewsletterListener {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * update is a method that is called when a new article is published.
   * @param article is the article that has been published.
   */
  update(article: string): void {
    console.log(`${this.name} received new article notification: ${article}`);
  }
}

// Example usage
// Create instances of Reader and Newsletter.
// Subscribe readers to the newsletter.
// When the author writes an article, all subscribed readers will receive a notification.
// This demonstrates how the Observer Pattern allows for dynamic updates to subscribers
// without the need for the author to know about each individual reader.

const john = new Reader('John');
const jane = new Reader('Jane');

const newsletter = new Newsletter();
newsletter.subscribe(john);
newsletter.subscribe(jane);

const author = new Author();
author.newsletter = newsletter;

author.writeArticle(); // John and Jane will receive the notification
console.log('Jane unsubscribes from the newsletter');
newsletter.unsubscribe(jane);
author.writeArticle(); // Only John will receive the notification
