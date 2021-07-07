import React from 'react';
import debounce from 'lib/debounce';

export interface Props extends React.HTMLAttributes<HTMLInputElement> {
  value?: string | null;
  inputRef: React.Ref<HTMLInputElement>;
}

type DebouncedInputState = {
  value?: string | null;
};

export default function withDebouncedInput(
  WrappedComponent: any,
  config = { timeout: 500 },
) {
  return class DebouncedInput extends React.Component<Props> {
    state: DebouncedInputState;

    constructor(props: Props) {
      super(props);
      this.state = {
        value: this.props.value === null ? '' : this.props.value,
      };

      this.sendTextChange = debounce(this.sendTextChange, config.timeout);
    }

    static getDerivedStateFromProps(nextProps: Props) {
      return nextProps.value === null ? { value: '' } : null;
    }

    handleTextChange = (e: any) => {
      this.setState({ value: e.target.value });
      this.sendTextChange({ target: { value: e.target.value } });
    };

    sendTextChange = (e: any) => {
      if (this.props.onChange) this.props.onChange(e);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          value={this.state.value} // todo vadim
          ref={this.props.inputRef}
          onChange={this.handleTextChange.bind(this)}
        />
      );
    }
  };
}
