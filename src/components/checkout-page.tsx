import * as React from "react";
import { observer } from "mobx-react";

// export interface IngredientsPage extends IStagble {
//   // stage: OrderStage;
// }

@observer
export class CheckoutPage extends React.Component<IStagble> {
  render() {
    return (
      <>
        {"Your salad"}
        <button onClick={this.orderButtonClick}>{"Order"}</button>
      </>
    );
  }

  orderButtonClick = () => this.props.goToNext && this.props.goToNext();
}
