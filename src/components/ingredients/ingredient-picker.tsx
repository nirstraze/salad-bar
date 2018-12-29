import * as React from "react";
import { Ingredient } from "src/models/ingredient";

import "./ingredients-picker.css";

interface IngredientsPickerProps {
  ingredient: Ingredient;
  isNotEditable?: boolean;
  onChange?: (value: string) => void;
}

export class IngredientsPicker extends React.Component<IngredientsPickerProps> {
  render() {
    const { ingredient, isNotEditable } = this.props;
    const { name, price, amount } = ingredient;

    return (
      <div className="ingredients-picker">
        <div className="info">
          <span className="name-label">{name}</span>
          <span className="price-label">{`${price}$`}</span>
        </div>

        {!isNotEditable && (
          <input
            className="amount-picker"
            type={"number"}
            onChange={this.handleOnChange}
            defaultValue={amount != null ? amount.toString() : ""}
          />
        )}
      </div>
    );
  }

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange && this.props.onChange(event.target.value);
}
