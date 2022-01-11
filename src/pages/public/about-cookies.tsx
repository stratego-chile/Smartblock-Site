import { Smartblock } from 'types';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from 'components/utils/layout';
import { useLayoutEffect, useState } from 'react';
import { ProvidersHelper } from 'helpers/providers';
import { marked } from 'marked';

const AboutCookies: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [remoteFile, setRemoteFile] = useState<string>();

  useLayoutEffect(() => {
    ProvidersHelper.HttpClient.get<string>('https://static-content.smartblock.cl/about-cookies.md', {
      headers: { Accept: 'text/markdown' }
    }).then(result => { setRemoteFile(result.data); });
  }, []);

  return (
    <Layout pageTitle='Cookies'>
      <Container className="my-5">
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

export default AboutCookies;
