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
    return "Starting the car engine.";
  }

  drive(): string {
    return `Driving the car at a maximum speed of ${this.maxSpeed} km/h.`;
  }

  stopEngine(): string {
    return "Stopping the car engine.";
  }
}

class Bike implements Vehicle {
  constructor(
    public color: string,
    public maxSpeed: number,
    public wheelCount: number
  ) {}

  refuel(): string {
    return "No refueling needed for a bike.";
  }

  startEngine(): string {
    return "Starting the bike engine.";
  }

  drive(): string {
    return `Riding the bike at a maximum speed of ${this.maxSpeed} km/h.`;
  }

  stopEngine(): string {
    return "Stopping the bike engine.";
  }
}

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
    return "Starting the airplane engines.";
  }
  drive(): string {
    return `Taking off with the airplane at a maximum speed of ${this.maxSpeed} km/h.`;
  }
  stopEngine(): string {
    return "Stopping the airplane engines.";
  }
}


abstract class VehicleTrip {
  abstract vehicleFactory(): Vehicle;
  driveVehicle(): string {
    const vehicle = this.vehicleFactory();
    vehicle.refuel();
    vehicle.startEngine();
    return vehicle.drive();
  }
}

class CarTrip extends VehicleTrip {
  vehicleFactory(): Vehicle {
    return new Car("red", 150, 4, "gasoline");
  }
}

class BikeTrip extends VehicleTrip {
  vehicleFactory(): Vehicle {
    return new Bike("blue", 30, 2);
  }
}

class AirplaneTrip extends VehicleTrip {
  vehicleFactory(): Vehicle {
    return new Airplane("white", 900, 3, "jet fuel");
  }
}

function travel(trip: VehicleTrip) {
  console.log("Let's start the trip! I just don't know which vehicle we will use.");
  console.log(trip.driveVehicle());
}

travel(new CarTrip());
travel(new BikeTrip());
travel(new AirplaneTrip());