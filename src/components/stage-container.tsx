import * as React from "react";
import { observer } from "mobx-react";

import { OrderStage } from "../state/salad-bar-store";
import { LandingPage } from "./landing-page";
import { IngredientsPage } from "./ingredients/ingredients-page";
import { CheckoutPage } from "./checkout/checkout-page";

import saladBarStore from "../state/salad-bar-store";

@observer
export class StageContainer extends React.Component {
  render() {
    switch (saladBarStore.currentStage) {
      case OrderStage.Landing:
        return (
          <LandingPage goToNext={this.changeStage(OrderStage.Ingrediants)} />
        );
      case OrderStage.Ingrediants:
        return (
          <IngredientsPage
            goToPrev={this.changeStage(OrderStage.Landing)}
            goToNext={this.changeStage(OrderStage.Checkout)}
          />
        );
      case OrderStage.Checkout:
        return (
          <CheckoutPage
            goToPrev={this.changeStage(OrderStage.Ingrediants)}
            goToNext={this.changeStage(OrderStage.Summary)}
          />
        );
      case OrderStage.Summary:
        return "summaSummaryry";
    }
  }

  changeStage = (newStage: OrderStage) => () =>
    saladBarStore.changeStage(newStage);
}


