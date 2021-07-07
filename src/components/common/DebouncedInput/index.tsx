import React, { Ref } from 'react';
import withDebouncedInput from 'components/common/DebouncedInput/withDebouncedInput';
import InputLoading from '../Form/InputLoading';
import Button, { ButtonSchemeEnum } from '../Button';
import './style.scss';

interface WithDebouncedInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  inputRef: Ref<HTMLInputElement>;
  isLoading: boolean;
}

// TODO: Write custom Input component here as well
const DebouncedInput = withDebouncedInput(function DebouncedInput({
  inputRef,
  isLoading = false,
  ...props
}: WithDebouncedInputProps) {
  return (
    <div className="debounced-input-wrapper">
      <div className="debounced-input-append-right">
        {!isLoading ? (
          <Button
            scheme={ButtonSchemeEnum.SQUARE}
            schemes={[ButtonSchemeEnum.INSET]}
          >
            <span
              style={{
                fontWeight: 200,
                fontSize: '1.5rem',
                lineHeight: '2rem',
              }}
            >
              &uarr; {/* Icon will be inserted here */}
            </span>
          </Button>
        ) : (
          <InputLoading show={isLoading} />
        )}
      </div>
      <input className={'debounced-input'} {...props} ref={inputRef} />
    </div>
  );
});

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  isLoading: boolean;
  // TODO: Add valueQ
  value?: string | null;
}

const ForwardedDebouncedInput = React.forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    return <DebouncedInput {...props} inputRef={ref} />;
  },
);

ForwardedDebouncedInput.displayName = 'DebouncedInput';
export default ForwardedDebouncedInput;
// todo should change to use HTMLImageElement props
