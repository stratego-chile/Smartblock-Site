import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';
import { Smartblock } from 'types';

const SubmitButton: FC<ButtonProps & Smartblock.Types.SubmitButtonProps> = (props: PropsWithChildren<ButtonProps & Smartblock.Types.SubmitButtonProps>): JSX.Element => {

  const { submitting, defaultContent, loadingContent, disabled, ...buttonProps } = props;
  const [state, setState] = useState<Smartblock.Types.SubmitButtonState>({ awaitingResponse: submitting });
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const defaultLoadingContent = <Spinner animation='border' size='sm' />;

  useEffect(() => {
    setState({
      ...state,
      awaitingResponse: submitting
    });
  }, [submitting]);

  useEffect(() => {
    setDisabled(state.awaitingResponse);
  }, [state.awaitingResponse]);

  useEffect(() => {
    setDisabled(!!props.disabled);
  }, [disabled]);

  return (
    <Button {...buttonProps} type='submit' role='button' disabled={isDisabled}>
      {state.awaitingResponse ? (loadingContent ?? defaultLoadingContent) : defaultContent}
    </Button>
  );
};

export default SubmitButton;
