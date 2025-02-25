class Human {
  power!: SuperPower;

  sayName() {
    console.log("Hey!! I am human");
  }

  setSupperPower(power: SuperPower) {
    this.power = power;
  }
}

interface SuperPower {
  powerLaber: () => void;
}

class FlyingPower implements SuperPower {
  powerLaber() {
    console.log("I have supper natural power");
  }
}

const anjan = new Human();
anjan.sayName();
anjan.setSupperPower(new FlyingPower());
anjan.power.powerLaber();

const rajan = new Human();
