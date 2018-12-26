import * as React from "react";
import { observer } from "mobx-react";

import saladBarStore from "../../state/salad-bar-store";
import { IngredientsPicker } from "./ingredient-picker";

@observer
export class IngredientsPage extends React.Component<IStagble> {
  render() {
    return (
      <>
        {"Pick Whatever"}
        {saladBarStore.ingredients &&
          saladBarStore.ingredients.map(ing => (
            <IngredientsPicker key={ing.name} ingredient={ing} />
          ))}
        <button onClick={this.proceedToCheckoutClick}>
          {"Proceed To Checkout"}
        </button>
      </>
    );
  }

  componentDidMount() {
    saladBarStore.loadIngredients();
  }

  proceedToCheckoutClick = () => this.props.goToNext && this.props.goToNext();
}
