import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Smartblock } from 'types';

const SubmitButton: FC<ButtonProps & Smartblock.Types.SubmitButtonProps> = (props: PropsWithChildren<ButtonProps & Smartblock.Types.SubmitButtonProps>) => {

  const { submitting, defaultContent, loadingContent, ...buttonProps } = props;
  const [state, setState] = useState<Smartblock.Types.SubmitButtonState>({ awaitingResponse: submitting });
  const defaultLoadingContent = <FontAwesomeIcon icon={faSpinner} spin />;

  useEffect(() => {
    setState({
      ...state,
      awaitingResponse: props.submitting
    });
  }, [props.submitting]);

  return (
    <Button {...buttonProps} type="submit" role="button" disabled={state.awaitingResponse}>
      {state.awaitingResponse ? (loadingContent ?? defaultLoadingContent) : defaultContent}
    </Button>
  );
};

export default SubmitButton;
