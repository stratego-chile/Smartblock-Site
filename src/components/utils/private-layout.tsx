import SideBarStyles from 'styles/modules/side-bar.module.sass';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import PrivateTopBar from 'components/shared/private-top-bar';
import {
  FC,
  useEffect,
  useState,
  MouseEvent,
  Fragment
} from 'react';
import { Title } from 'helpers/pager';
import { useStyleModules } from 'helpers/props';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { RoutesMap } from 'routes/map';
import { useMeasure } from 'react-use';
import SideBar from 'components/shared/side-bar';

type PrivateLayoutProps = {
  pageTitle?: string;
  allowSideBarToggle?: boolean;
};

const PrivateLayout: FC<PrivateLayoutProps> = (props) => {

  const { children, pageTitle, allowSideBarToggle = true } = props;

  const breadcrumbs = useBreadcrumbs(
    Object.keys(RoutesMap).map(routeName => {
      const routeData = RoutesMap[routeName];
      const routeConfig: BreadcrumbsRoute<string> = {
        path: routeData.path
      };
      return routeConfig;
    }),
    {
      disableDefaults: false
    }
  );

  const [sideBarRef, sideBarDimensions] = useMeasure<HTMLDivElement>();

  const [showDevModeAlert, setShowDevModeAlert] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [sideBarWidth, setSideBarWidth] = useState<number>(0);

  const toggleSideBarVisibility = (event: MouseEvent) => {
    if (event.isTrusted) {
      setShowSideBar(!showSideBar);
    }
  };

  const adjustSideBarWidth = (width: number) => {
    setSideBarWidth(width);
  };

  useEffect(() => {
    adjustSideBarWidth(sideBarDimensions.width);
  }, [sideBarDimensions.width]);

  useEffect(() => {
    Title.set(pageTitle);
  }, [pageTitle]);

  return (
    <>
      {
        showDevModeAlert && process.env.NODE_ENV === 'development'
          ? <Alert className="fixed-top mb-0" variant="warning" onClose={() => setShowDevModeAlert(false)} dismissible>
            Esta aplicación está en desarrollo y está sujeto a cambios. Por favor, tenga en consideración que puede ser inestable y presentar comportamientos inesperados.
          </Alert>
          : null
      }
      <Container fluid>
        <Row>
          <Col
            ref={sideBarRef}
            md='5' lg='4' xl='2'
            className={useStyleModules(showSideBar ? '' : SideBarStyles.noWidth, SideBarStyles.wrapper)}
            style={{ overflow: 'scroll' }}>
            {
              allowSideBarToggle
                ? <Button
                  variant='dark'
                  className={useStyleModules(SideBarStyles.sideBarToggler, 'no-shadow')}
                  style={{ left: sideBarWidth }}
                  onClick={toggleSideBarVisibility}
                  role='button'
                  type='button'
                  size='sm'>
                  {showSideBar ? <BsChevronDoubleLeft /> : <BsChevronDoubleRight />}
                </Button>
                : null
            }
            <SideBar showSideBar={showSideBar} />
          </Col>
          <Col className='p-0'>
            <PrivateTopBar />
            <Container fluid className='mb-4'>
              <Row style={{ marginTop: 32 }}>
                <Col>
                  <Col className='bg-light standard-radius d-flex flex-wrap align-items-center' style={{ marginBottom: 32, height: 50, paddingLeft: 25 }}>
                    <Fragment>
                      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
                    </Fragment>
                  </Col>
                  <Col className='bg-light standard-radius' style={{ paddingLeft: 25, paddingTop: 15, paddingBottom: 15 }}>
                    {children}
                  </Col>
                </Col>
                <Col sm='12' lg='2' className='d-none d-xl-block'>
                  <div className='bg-light standard-radius shadow' style={{ minHeight: 250, padding: 25 }}>
                    <p>Solicitar Soporte</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivateLayout;
