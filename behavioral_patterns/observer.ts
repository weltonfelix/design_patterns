interface NewsletterListener {
  update(article: string): void;
}

class Newsletter {
  listeners: NewsletterListener[] = [];

  subscribe(listener: NewsletterListener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: NewsletterListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify(article: string) {
    console.log(`New article published: ${article}`);
    this.listeners.forEach((listener) => listener.update(article));
  }
}

class Author {
  newsletter: Newsletter = new Newsletter();
  private articleCount: number = 0;

  writeArticle(): void {
    console.log('Writing a new article...');
    this.newsletter.notify(`#${++this.articleCount}`);
  }
}

class Reader implements NewsletterListener {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(article: string): void {
    console.log(`${this.name} received new article notification: ${article}`);
  }
}

const john = new Reader('John');
const jane = new Reader('Jane');

const newsletter = new Newsletter();
newsletter.subscribe(john);
newsletter.subscribe(jane);

const author = new Author();
author.newsletter = newsletter;

author.writeArticle(); // John and Jane will receive the notification
console.log("Jane unsubscribes from the newsletter");
newsletter.unsubscribe(jane);
author.writeArticle(); // Only John will receive the notification
