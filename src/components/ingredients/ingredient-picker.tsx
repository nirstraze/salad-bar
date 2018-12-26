import * as React from "react";
import { Ingredient } from "src/models/ingredient";

interface IngredientsPickerProps {
  ingredient: Ingredient;
}

export class IngredientsPicker extends React.Component<IngredientsPickerProps> {
  render() {
    return (
      <div>
        <span>{this.props.ingredient.name}</span>
        <span>{this.props.ingredient.price}</span>
        <input
          type={"number"}
          /* value={value}
                onChange={this.props.handleOnChage} */
        />
      </div>
    );
  }
}
