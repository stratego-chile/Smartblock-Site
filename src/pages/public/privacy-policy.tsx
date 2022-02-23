import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';
import Layout from 'components/utils/layout';
import { ProvidersHelper } from 'helpers/providers';
import { useState, useLayoutEffect } from 'react';
import { marked } from 'marked';

const PrivacyPolicy: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [remoteFile, setRemoteFile] = useState<string>();

  useLayoutEffect(() => {
    ProvidersHelper.HttpClient.get<string>('https://static-content.smartblock.cl/privacy-policy.md', {
      headers: { Accept: 'text/markdown' }
    }).then(result => { setRemoteFile(result.data); });
  }, []);

  return (
    <Layout pageTitle='Política de privacidad'>
      <Container className='my-5'>
        <Row>
          <Col>
            {
              typeof remoteFile === 'string'
                ? <article dangerouslySetInnerHTML={{__html: marked(remoteFile)}}></article>
                : null
            }
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
