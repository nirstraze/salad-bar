import * as React from "react";
import { observer } from "mobx-react";
import { IngredientsPicker } from "../ingredients/ingredient-picker";

import saladBarStore from "../../state/salad-bar-store";

import "./checkout-page.css";

@observer
export class CheckoutPage extends React.Component<IStagble> {
  render() {
    const selectedIngredients = Array.from(
      saladBarStore.ingredientsMap.entries()
    )
      .filter(entry => entry[1].amount)
      .map(entry => entry[1]);

    const totalPrice = saladBarStore.getTotalPrice();

    return (
      <>
        <div className="page-header">{"Your Salad:"}</div>
        <div className="checkout-wrapper">
          <div>
            {selectedIngredients.map(ing => (
              <IngredientsPicker key={ing.name} ingredient={ing} isReadOnly />
            ))}

            <div>{`Total Price is: $${totalPrice}`}</div>
          </div>
          <div>
            {this.getOrderDetailsField(
              "Name",
              saladBarStore.setName,
              saladBarStore.isValid
            )}
            {this.getOrderDetailsField(
              "Email",
              saladBarStore.setEmail,
              saladBarStore.isValid
            )}
            {this.getOrderDetailsField(
              "Additional Notes",
              saladBarStore.setAdditionalNotes
            )}
            <div className="buttons-wrapper">
              <span className="button" onClick={this.goBackButtonClick}>
                {"Go Back"}
              </span>
              <span
                className={
                  "button" /* + saladBarStore.isValid ? "" : " disabled" */
                }
                onClick={this.orderButtonClick}
              >
                {"Order"}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  orderButtonClick = () => saladBarStore.setShowSummaryModal(true);

  goBackButtonClick = () => this.props.goToPrev && this.props.goToPrev();

  getOrderDetailsField = (
    fieldName: string,
    onChange: (value: string) => void,
    isValid: boolean = true
  ) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange && onChange(event.target.value);

    return (
      <div className="order-details-field">
        <span>{`${fieldName}:`}</span>
        <input type="text" onChange={handleOnChange} />
      </div>
    );
  };
}
