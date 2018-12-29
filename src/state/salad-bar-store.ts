import { action, observable, runInAction, computed } from "mobx";
import { Ingredient } from "src/models/ingredient";

export enum OrderStage {
  Landing,
  Ingrediants,
  Checkout,
  Summary
}

class SaladBarStore {
  @observable currentStage: OrderStage;
  @observable ingredientsMap: Map<string, Ingredient> = new Map<
    string,
    Ingredient
  >();

  @observable email: string;
  @observable name: string;

  @computed
  get isValid(): boolean {
    return !!this.email && this.email.length > 5;
  }

  constructor() {
    this.currentStage = OrderStage.Landing;
  }

  @action
  changeStage(stage: OrderStage) {
    this.currentStage = stage;
  }

  @action
  setEmail = (email: string) => {
    this.email = email;
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  loadIngredients() {
    if (!this.ingredientsMap.size)
      fetch("http://localhost:3000/salad.json")
        .then(res => {
          return res.json();
        })
        .then(data => {
          runInAction(() => {
            data.items.forEach((item: Ingredient) => {
              this.ingredientsMap.set(item.name, item);
            });
          });
        });
  }

  orderItem(itemName: string, amount: number) {
    const ingtoSet = this.ingredientsMap.get(itemName);
    if (ingtoSet) ingtoSet.amount = amount;
  }
}

const instance = new SaladBarStore();
export default instance;
