import React from 'react';
import ReactDOM from 'react-dom';
import ToastMessage from 'components/common/ToastMessage';

export class Notify {
  static buildContent = (message: React.ReactNode) => {
    const toastContainer = document.querySelector('.toast-messages>.wrapper');

    // TODO: Allow messages to be stacked
    ReactDOM.render(<React.Fragment>{message}</React.Fragment>, toastContainer);
  };

  static success(text?: string) {
    this.buildContent(
      <ToastMessage type="success" text={text} icon="icon-alert-circle" />,
    );
  }

  static error(text?: string) {
    this.buildContent(
      <ToastMessage type="error" text={text} icon="icon-alert-circle" />,
    );
  }

  static warning(text?: string) {
    this.buildContent(
      <ToastMessage type="warning" text={text} icon="icon-alert-circle" />,
    );
  }

  static info(text?: string) {
    this.buildContent(
      <ToastMessage type="info" text={text} icon="icon-alert-circle" />,
    );
  }
}
