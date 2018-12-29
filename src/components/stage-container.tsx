import * as React from "react";
import { observer } from "mobx-react";

import { OrderStage } from "../state/salad-bar-store";
import { LandingPage } from "./landing-page";
import { IngredientsPage } from "./ingredients/ingredients-page";
import { CheckoutPage } from "./checkout/checkout-page";
import { SummaryModal } from "./summary-modal/summary-modal";
import { OrderSummary } from "./summary-modal/order-summary";

import saladBarStore from "../state/salad-bar-store";

@observer
export class StageContainer extends React.Component {
  render() {
    return (
      <div>
        {saladBarStore.showSummaryModal && (
          <SummaryModal show handleClose={this.changeStage(OrderStage.Landing)}>
            <OrderSummary />
          </SummaryModal>
        )}
        {this.getStage()}
      </div>
    );
  }

  changeStage = (newStage: OrderStage) => () =>
    saladBarStore.changeStage(newStage);

  private getStage() {
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
          <CheckoutPage goToPrev={this.changeStage(OrderStage.Ingrediants)} />
        );
    }
  }
}
