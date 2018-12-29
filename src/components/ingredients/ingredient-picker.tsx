import * as React from "react";
import { Ingredient } from "src/models/ingredient";

import "./ingredients-picker.css";

interface IngredientsPickerProps {
  ingredient: Ingredient;
  isReadOnly?: boolean;
  onChange?: (value: string) => void;
}

export class IngredientsPicker extends React.Component<IngredientsPickerProps> {
  render() {
    const { ingredient, isReadOnly } = this.props;
    const { name, price, amount } = ingredient;

    return (
      <div className="ingredients-picker">
        <div className="info">
          <span className="name-label">{name}</span>
          <span className="price-label">{`$${price}`}</span>
        </div>

        <input
          className="amount-picker"
          type="number"
          min={0}
          step={1}
          onChange={this.handleOnChange}
          disabled={isReadOnly}
          defaultValue={amount != null ? amount.toString() : ""}
        />
      </div>
    );
  }

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange && this.props.onChange(event.target.value);
}
