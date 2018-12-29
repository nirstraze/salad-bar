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
  // @observable ingredients: Ingredient[];
  @observable ingredientsMap: Map<string, Ingredient> = new Map<
    string,
    Ingredient
  >();

  currentOrder: Map<string, number> = new Map<string, number>();

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
        runInAction(() => {
          //this.ingredients = data.items;
          data.items.forEach((item: Ingredient) => {
            this.ingredientsMap.set(item.name, item);
          });
        });
      });
  }

  orderItem(itemName: string, amount: number) {
    this.currentOrder.set(itemName, amount);

    const ingtoSet = this.ingredientsMap.get(itemName);
    if (ingtoSet) ingtoSet.amount = amount;
  }
}

const instance = new SaladBarStore();
export default instance;
