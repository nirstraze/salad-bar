import * as React from "react";

import saladBarStore from "../../state/salad-bar-store";

export class OrderSummary extends React.Component {
  render() {
    return (
      <div>
        Thank You Very Much For Ordering From Salad Bar 
        Food Is On its Way!!!
        {this.getOrderDetailsField("Total Price", `$${saladBarStore.getTotalPrice().toString()}`)}
        {this.getOrderDetailsField("Name", saladBarStore.name)}
        {this.getOrderDetailsField("Email", saladBarStore.email)}
        {this.getOrderDetailsField("Additional Notes", saladBarStore.notes)}
      </div>
    );
  }

  getOrderDetailsField = (fieldName: string, data: string) => {
    return (
      <div className="order-details-field">
        <span>{`${fieldName}:`}</span>
        <span>{`${data}`}</span>
      </div>
    );
  };
}
