import { action, observable, runInAction, computed } from "mobx";
import { Ingredient } from "src/models/ingredient";

export enum OrderStage {
  Landing,
  Ingrediants,
  Checkout
}

class SaladBarStore {
  @observable currentStage: OrderStage;
  @observable showSummaryModal: boolean;
  @observable ingredientsMap: Map<string, Ingredient> = new Map<
    string,
    Ingredient
  >();

  @observable email: string;
  @observable name: string;
  @observable notes: string;

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
  setShowSummaryModal(show: boolean) {
    this.showSummaryModal = show;
  }

  @action
  setEmail = (email: string) => {
    this.email = email;
  };

  @action
  setName = (name: string) => {
    this.name = name;
  };

  @action
  setAdditionalNotes = (notes: string) => {
    this.notes = notes;
  };

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

  getTotalPrice(): number {
    const selectedIngredients = Array.from(this.ingredientsMap.entries())
      .filter(entry => entry[1].amount)
      .map(entry => entry[1]);

    const totalPrice = selectedIngredients.reduce(
      (total, ing) => total + ing.amount * ing.price,
      0
    );

    return totalPrice;
  }
}

const instance = new SaladBarStore();
export default instance;
