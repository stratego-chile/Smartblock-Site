import SocialNetworksStyles from 'styles/modules/social-networks.module.sass';
import { FC, MouseEvent, PropsWithChildren } from 'react';
import { faLinkedin, faSlack } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyleModules } from 'helpers/props';
import { Row, Col, Button } from 'react-bootstrap';
import { Smartblock } from 'types';

const SocialNetworks: FC<Smartblock.Types.SocialNetworksProps> = (props: PropsWithChildren<Smartblock.Types.SocialNetworksProps>) => {

  const handleOptionSelection = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.isTrusted) {
      const target = event.target as HTMLElement;
      const button = (target instanceof HTMLButtonElement ? target : target.parentElement) as HTMLButtonElement;
      const context = button.getAttribute('aria-details');
      if (context && props.onOptionSelection) {
        props.onOptionSelection({ tag: context });
      }
    }
  };

  return (
    <>
      <Row>
        <Col className="text-center my-4">
          <h5>O accede con</h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            type="button"
            role="button"
            className={useStyleModules(SocialNetworksStyles.socialNetworkSignInButton, SocialNetworksStyles.btnLinkedIn)}
            size="lg"
            aria-details="linkedin"
            onClick={handleOptionSelection}>
            <FontAwesomeIcon icon={faLinkedin} /><span className={SocialNetworksStyles.socialNetworkName}>Linkedin</span>
          </Button>
          <Button
            type="button"
            role="button"
            className={useStyleModules(SocialNetworksStyles.socialNetworkSignInButton, SocialNetworksStyles.btnSlack)}
            size="lg"
            aria-details="slack"
            onClick={handleOptionSelection}>
            <FontAwesomeIcon icon={faSlack} /><span className={SocialNetworksStyles.socialNetworkName}>Slack</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SocialNetworks;
