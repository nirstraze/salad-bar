import * as React from "react";
import { observer } from "mobx-react";

export interface LandingPageProps extends IStagble {
  // stage: OrderStage;
}

@observer
export class LandingPage extends React.Component<LandingPageProps> {
  render() {
    return (
      <>
        {"Welcome"}
        <button onClick={this.orderSaladOnClick}>{"Order Salad"}</button>
      </>
    );
  }

  orderSaladOnClick = () => 
    this.props.goToNext && this.props.goToNext();
  ;
}
