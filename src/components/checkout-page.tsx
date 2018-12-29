import * as React from "react";
import { observer } from "mobx-react";

import saladBarStore from "../state/salad-bar-store";
import { IngredientsPicker } from "./ingredients/ingredient-picker";

@observer
export class CheckoutPage extends React.Component<IStagble> {
  render() {
    const selectedIngredients = Array.from(
      saladBarStore.ingredientsMap.entries()
    )
      .filter(entry => entry[1].amount)
      .map(entry => entry[1]);

    const totalPrice = selectedIngredients.reduce(
      (total, ing) => total + ing.amount * ing.price,
      0
    );

    return (
      <>
        <div className="page-header">{"Your Salad:"}</div>

        {selectedIngredients.map(ing => {
          return (
            <IngredientsPicker key={ing.name} ingredient={ing} />
            // <div key={ingredient.name}>
            //   <span>{ingredient.name}</span>
            //   <span>{ingredient.amount}</span>
            //   <span>{ingredient.price}</span>
            // </div>
          );
        })}

        <div>{`Total Price is: ${totalPrice}`}</div>

        <div>
          <span className="button" onClick={this.goBackButtonClick}>
            {"Go Back"}
          </span>
          <span className="button" onClick={this.orderButtonClick}>
            {"Order"}
          </span>
        </div>
      </>
    );
  }

  orderButtonClick = () => this.props.goToNext && this.props.goToNext();

  goBackButtonClick = () => this.props.goToPrev && this.props.goToPrev();
}
