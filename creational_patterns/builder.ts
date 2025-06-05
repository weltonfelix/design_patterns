// Builder Pattern
// The Builder Pattern is a creational design pattern that allows for the step-by-step construction of complex objects.
// It separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
// It is particularly useful when an object needs to be created with many optional parameters or configurations.
// https://refactoring.guru/design-patterns/builder

/**
 * PizzaBuilder is an interface that defines the methods for building a pizza.
 * It allows for the creation of different types of pizzas with various configurations.
 * This is the Builder interface in the Builder Pattern.
 */
interface PizzaBuilder {
  reset(): PizzaBuilder;

  setSize(size: number): PizzaBuilder;
  setOlivesAmount(amount: number): PizzaBuilder;
  addCheese(): PizzaBuilder;
  addPepperoni(): PizzaBuilder;
  addOnions(): PizzaBuilder;
  setStuffedCrust(stuffedCrust: string): PizzaBuilder;

  bake(): Pizza;
}

/**
 * Pizza is a class that represents a pizza with various properties.
 * It has a size, amount of olives, cheese type, and flags for pepperoni, onions, and stuffed crust.
 * This is the Product in the Builder Pattern.
 */
class Pizza {
  readonly size: number = 0;
  olivesAmount: number = 0;
  hasCheese: boolean = false;
  cheeseType?: string;
  hasPepperoni: boolean = false;
  hasOnions: boolean = false;
  stuffedCrust?: string;

  constructor(size: number) {
    this.size = size;
  }
}

/**
 * MyPizzeria is a concrete implementation of the PizzaBuilder interface.
 * It provides methods to build a pizza with specific configurations.
 * This is a Concrete Builder in the Builder Pattern.
 */
class MyPizzeria implements PizzaBuilder {
  pizza!: Pizza;
  pizzaSize!: number;

  constructor() {
    this.reset();
  }

  reset(): PizzaBuilder {
    this.pizza = new Pizza(0);
    this.pizzaSize = 0;
    return this;
  }
  setSize(size: number): PizzaBuilder {
    this.pizzaSize = size;
    return this;
  }
  setOlivesAmount(amount: number): PizzaBuilder {
    this.pizza.olivesAmount = amount;
    return this;
  }
  addCheese(): PizzaBuilder {
    this.pizza.hasCheese = true;
    this.pizza.cheeseType = 'mozzarella';
    return this;
  }
  addPepperoni(): PizzaBuilder {
    this.pizza.hasPepperoni = true;
    return this;
  }
  addOnions(): PizzaBuilder {
    this.pizza.hasOnions = true;
    return this;
  }
  setStuffedCrust(stuffedCrust: string): PizzaBuilder {
    this.pizza.stuffedCrust = stuffedCrust;
    return this;
  }

  bake(): Pizza {
    const bakedPizza = new Pizza(this.pizzaSize);
    bakedPizza.olivesAmount = this.pizza.olivesAmount;
    bakedPizza.hasCheese = this.pizza.hasCheese;
    bakedPizza.cheeseType = this.pizza.cheeseType;
    bakedPizza.hasPepperoni = this.pizza.hasPepperoni;
    bakedPizza.hasOnions = this.pizza.hasOnions;
    bakedPizza.stuffedCrust = this.pizza.stuffedCrust;

    this.reset();
    return bakedPizza;
  }
}

/**
 * ItalianPizzeria is a concrete implementation of the PizzaBuilder interface.
 * It provides methods to build a pizza with specific Italian configurations.
 * This is a Concrete Builder in the Builder Pattern.
 */
class ItalianPizzeria implements PizzaBuilder {
  pizza!: Pizza;
  pizzaSize!: number;

  constructor() {
    this.reset();
  }

  reset(): PizzaBuilder {
    this.pizza = new Pizza(0);
    this.pizzaSize = 0;
    return this;
  }
  setSize(size: number): PizzaBuilder {
    this.pizzaSize = size;
    return this;
  }
  setOlivesAmount(amount: number): PizzaBuilder {
    this.pizza.olivesAmount = amount;
    return this;
  }
  addCheese(): PizzaBuilder {
    this.pizza.hasCheese = true;
    this.pizza.cheeseType = 'parmesan';
    return this;
  }
  addPepperoni(): PizzaBuilder {
    this.pizza.hasPepperoni = false;
    return this;
  }
  addOnions(): PizzaBuilder {
    this.pizza.hasOnions = true;
    return this;
  }
  setStuffedCrust(stuffedCrust: string): PizzaBuilder {
    this.pizza.stuffedCrust =
      "No stuffed crust. Italians don't do stuffed crust.";
    return this;
  }

  bake(): Pizza {
    const bakedPizza = new Pizza(this.pizzaSize);
    bakedPizza.olivesAmount = this.pizza.olivesAmount;
    bakedPizza.hasCheese = this.pizza.hasCheese;
    bakedPizza.cheeseType = this.pizza.cheeseType;
    bakedPizza.hasPepperoni = this.pizza.hasPepperoni;
    bakedPizza.hasOnions = this.pizza.hasOnions;
    bakedPizza.stuffedCrust = this.pizza.stuffedCrust;

    this.reset();
    return bakedPizza;
  }
}

/**
 * PizzaMaker is a class that demonstrates how to use the Builder Pattern to create pizzas.
 * It uses the MyPizzeria builder to prepare a pizza with various configurations.
 * This is the Director in the Builder Pattern.
 */
class PizzaMaker {
  preparePizza() {
    const builder = new MyPizzeria();
    builder.setSize(30).addCheese().setOlivesAmount(16);

    if ((() => true)()) {
      builder.addPepperoni();
    }
    if ((() => false)()) {
      builder.addOnions();
    }

    const pizza = builder.bake();
    console.log(pizza);

    const simplePizza = builder.addCheese().bake();
    console.log(simplePizza);
  }
}

// Example usage
// Create an instance of PizzaMaker and prepare a pizza.

new PizzaMaker().preparePizza();
