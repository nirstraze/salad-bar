import * as React from "react";

import saladBarStore from "../../state/salad-bar-store";

import "./summary-modal.css";

export interface SummaryModalprops {
  handleClose: () => void;
  show: boolean;
}

export class SummaryModal extends React.Component<SummaryModalprops> {
  render() {
    const { show } = this.props;
    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <div className="modal-main">
          {this.props.children}
          <div className="button" onClick={this.handleClose}>
            Close
          </div>
        </div>
      </div>
    );
  }

  handleClose = () => {
    saladBarStore.setShowSummaryModal(false);
    this.props.handleClose && this.props.handleClose();
  };
}
