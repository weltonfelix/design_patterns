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

// how do i call pizzaria in english?

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

new PizzaMaker().preparePizza();