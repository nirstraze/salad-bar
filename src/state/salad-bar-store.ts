import { action, observable, runInAction } from "mobx";
import { Ingredient } from "src/models/ingredient";
export enum OrderStage {
  Landing,
  Ingrediants,
  Checkout,
  Summary
}

class SaladBarStore {
  @observable currentStage: OrderStage;
  @observable ingredients: Ingredient[];

  constructor() {
    this.currentStage = OrderStage.Landing;
  }

  @action
  changeStage(stage: OrderStage) {
    this.currentStage = stage;
  }

  loadIngredients() {
    fetch("http://localhost:3000/salad.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        runInAction(() => (this.ingredients = data.items));
        console.log(data);
      });
  }
}

const instance = new SaladBarStore();
export default instance;
