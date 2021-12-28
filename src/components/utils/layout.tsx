import TopBar from 'components/shared/top-bar';
import Footer from 'components/shared/footer';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import { Title } from 'helpers/pager';
import { Alert } from 'react-bootstrap';

type LayoutProps = {
  pageTitle?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Layout: FC<LayoutProps> = ({ pageTitle, children, ...divProps }: PropsWithChildren<LayoutProps>): JSX.Element => {
  
  const [showDevModeAlert, setShowDevModeAlert] = useState<boolean>(true);
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    setTitle({ pageTitle, ...divProps }.pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    Title.set(title);
  }, [title]);

  return (
    <>
      {
        showDevModeAlert && process.env.NODE_ENV === 'development'
          ? <Alert className="sticky-top mb-0 fixed-top" variant="warning" onClose={() => setShowDevModeAlert(false)} dismissible>
            Esta aplicación está en desarrollo y está sujeto a cambios. Por favor, tenga en consideración que puede ser inestable y presentar comportamientos inesperados.
          </Alert>
          : null
      }
      <div {...divProps}>
        <TopBar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
