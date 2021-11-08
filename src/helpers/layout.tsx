import Footer from 'components/shared/footer';
import TopBar from 'components/shared/top-bar';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import { Title } from './pager';

type LayoutProps = {
  pageTitle?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Layout: FC<LayoutProps> = ({ pageTitle, children, ...divProps }: PropsWithChildren<LayoutProps>) => {
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    setTitle({ pageTitle, ...divProps }.pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    Title.set(title);
  }, [title]);

  return (
    <div {...divProps}>
      <TopBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
