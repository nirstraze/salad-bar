import * as React from "react";
import { observer } from "mobx-react";

import saladBarStore from "../../state/salad-bar-store";
import { IngredientsPicker } from "./ingredient-picker";

@observer
export class IngredientsPage extends React.Component<IStagble> {
  render() {
    const ingredients = Array.from(saladBarStore.ingredientsMap.entries()).map(
      entry => entry[1]
    );
    return (
      <>
        <div className="page-header">{"Pick Whatever"}</div>

        {ingredients &&
          ingredients.map(ing => (
            <IngredientsPicker
              key={ing.name}
              ingredient={ing}
              onChange={this.addItem(ing.name)}
            />
          ))}
        <div className="button" onClick={this.proceedToCheckoutClick}>
          {"Proceed To Checkout"}
        </div>
      </>
    );
  }

  componentDidMount() {
    saladBarStore.loadIngredients();
  }

  addItem = (ingredientName: string) => (amount: string) =>
    saladBarStore.orderItem(ingredientName, +amount);

  proceedToCheckoutClick = () => this.props.goToNext && this.props.goToNext();
}
