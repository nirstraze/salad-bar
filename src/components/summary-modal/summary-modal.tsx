import * as React from "react";

export interface SummaryModalprops {
  handleClose: () => {};
  show: boolean;
}

export class SummaryModal extends React.Component<SummaryModalprops> {
  render() {
    const { show, handleClose } = this.props;
    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          <button onClick={handleClose}>Close</button>
        </section>
      </div>
    );
  }
}
