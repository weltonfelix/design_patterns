// Factory Pattern
// This pattern defines an interface for creating objects, but allows subclasses to alter the type of objects that will be created.
// It is used to encapsulate the instantiation logic and promote loose coupling.
// https://refactoring.guru/design-patterns/factory-method

/**
 * Vehicle is an interface that defines the properties and methods
 * that all vehicles must implement. It includes properties like color, maxSpeed,
 * wheelCount, and fuelType, as well as methods for refueling, starting the engine,
 * driving, and stopping the engine.
 * This is the Product in the Factory Method Pattern.
 */
interface Vehicle {
  color: string;
  maxSpeed: number;
  wheelCount: number;
  fuelType?: string;
  refuel(): string;
  startEngine(): string;
  drive(): string;
  stopEngine(): string;
}

/**
 * Car is a class that implements the Vehicle interface.
 * It represents a car with properties like color, maxSpeed, wheelCount, and fuelType.
 * It provides implementations for the methods defined in the Vehicle interface,
 * such as refueling, starting the engine, driving, and stopping the engine.
 * This is a Concrete Product in the Factory Method Pattern.
 */
class Car implements Vehicle {
  constructor(
    public color: string,
    public maxSpeed: number,
    public wheelCount: number,
    public fuelType: string
  ) {}

  refuel(): string {
    return `Refueling the car with ${this.fuelType}.`;
  }

  startEngine(): string {
    return 'Starting the car engine.';
  }

  drive(): string {
    return `Driving the car at a maximum speed of ${this.maxSpeed} km/h.`;
  }

  stopEngine(): string {
    return 'Stopping the car engine.';
  }
}

/**
 * Bike is a class that implements the Vehicle interface.
 * It represents a bike with properties like color, maxSpeed, and wheelCount.
 * It provides implementations for the methods defined in the Vehicle interface,
 * such as refueling, starting the engine, driving, and stopping the engine.
 * This is a Concrete Product in the Factory Method Pattern.
 */
class Bike implements Vehicle {
  constructor(
    public color: string,
    public maxSpeed: number,
    public wheelCount: number
  ) {}

  refuel(): string {
    return 'No refueling needed for a bike.';
  }

  startEngine(): string {
    return 'Starting the bike engine.';
  }

  drive(): string {
    return `Riding the bike at a maximum speed of ${this.maxSpeed} km/h.`;
  }

  stopEngine(): string {
    return 'Stopping the bike engine.';
  }
}

/**
 * Airplane is a class that implements the Vehicle interface.
 * It represents an airplane with properties like color, maxSpeed, wheelCount, and fuelType.
 * It provides implementations for the methods defined in the Vehicle interface,
 * such as refueling, starting the engine, driving (taking off), and stopping the engine.
 * This is a Concrete Product in the Factory Method Pattern.
 */
class Airplane implements Vehicle {
  constructor(
    public color: string,
    public maxSpeed: number,
    public wheelCount: number,
    public fuelType: string
  ) {}
  refuel(): string {
    return `Refueling the airplane with ${this.fuelType}.`;
  }
  startEngine(): string {
    return 'Starting the airplane engines.';
  }
  drive(): string {
    return `Taking off with the airplane at a maximum speed of ${this.maxSpeed} km/h.`;
  }
  stopEngine(): string {
    return 'Stopping the airplane engines.';
  }
}

/**
 * VehicleTrip is an abstract class that defines the template method driveVehicle.
 * It provides a common interface for different types of vehicle trips.
 * The driveVehicle method calls the vehicleFactory method to create a vehicle,
 * refuels it, starts the engine, and then drives it.
 * This is the Creator in the Factory Method Pattern.
 */
abstract class VehicleTrip {
  /**
   * vehicleFactory is an abstract method that must be implemented by subclasses.
   * It is responsible for creating a specific type of Vehicle.
   * This method allows subclasses to define how to create the vehicle they need for the trip.
   * @returns A Vehicle instance that is created by the subclass.
   * This is the Factory Method in the Factory Method Pattern.
   */
  abstract vehicleFactory(): Vehicle;
  /**
   * driveVehicle is a method that uses the vehicleFactory method to create a Vehicle,
   * refuels it, starts the engine, and drives it.
   * It provides a common way to perform a trip with a vehicle,
   * regardless of the specific type of vehicle being used.
   * This method encapsulates the trip logic and allows subclasses to focus on creating the vehicle.
   * @returns A string describing the trip with the vehicle.
   */
  driveVehicle(): string {
    const vehicle = this.vehicleFactory();
    vehicle.refuel();
    vehicle.startEngine();
    return vehicle.drive();
  }
}

/**
 * CarTrip is a concrete class that extends VehicleTrip.
 * It implements the vehicleFactory method to create a Car instance.
 * This is a Concrete Creator in the Factory Method Pattern.
 */
class CarTrip extends VehicleTrip {
  vehicleFactory(): Vehicle {
    return new Car('red', 150, 4, 'gasoline');
  }
}

/**
 * BikeTrip is a concrete class that extends VehicleTrip.
 * It implements the vehicleFactory method to create a Bike instance.
 * This is a Concrete Creator in the Factory Method Pattern.
 */
class BikeTrip extends VehicleTrip {
  vehicleFactory(): Vehicle {
    return new Bike('blue', 30, 2);
  }
}

/**
 * AirplaneTrip is a concrete class that extends VehicleTrip.
 * It implements the vehicleFactory method to create an Airplane instance.
 * This is a Concrete Creator in the Factory Method Pattern.
 */
class AirplaneTrip extends VehicleTrip {
  vehicleFactory(): Vehicle {
    return new Airplane('white', 900, 3, 'jet fuel');
  }
}

/**
 * travel is a function that takes a VehicleTrip instance as an argument.
 * It starts the trip by calling the driveVehicle method on the trip instance.
 * This function demonstrates how the Factory Method Pattern allows for dynamic creation
 * of different types of vehicles without needing to know the specifics of each vehicle.
 * This is the Client in the Factory Method Pattern.
 * @param trip is an instance of VehicleTrip that represents a trip with a specific vehicle.
 */
function travel(trip: VehicleTrip) {
  console.log(
    "Let's start the trip! I just don't know which vehicle we will use."
  );
  console.log(trip.driveVehicle());
}

// Example usage
// Create instances of CarTrip, BikeTrip, and AirplaneTrip,
// and call the travel function with each trip instance.

travel(new CarTrip());
travel(new BikeTrip());
travel(new AirplaneTrip());
