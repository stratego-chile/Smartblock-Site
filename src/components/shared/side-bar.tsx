import { FC, useState, useLayoutEffect, MouseEvent, useEffect } from 'react';
import SideBarStyles from 'styles/modules/side-bar.module.sass';
import { Image, Button } from 'react-bootstrap';
import { useStyleModules } from 'helpers/props';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { SideBarData } from 'helpers/sidebar-links';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import Manifest from '../../../package.json';
import { Link } from 'react-router-dom';
import { useMeasure } from 'react-use';

type SideBarModulesRefs = Record<string, boolean>;

export type SideBarProps = {
  onSideBarClose?: (state: boolean) => void;
  showToggler?: boolean;
};

const SideBar: FC<SideBarProps> = (props: SideBarProps) => {

  const { onSideBarClose, showToggler = true } = props;

  const [sideBarRef, sideBarDimensions] = useMeasure<HTMLDivElement>();
  
  const [moduleRefs, setModulesRefs] = useState<SideBarModulesRefs>({});
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [sideBarWidth, setSideBarWidth] = useState<number>();
  const [isSideBarFullScreen, setSideBarFullScreen] = useState<boolean>();

  const toggleSubModuleVisibility = (event: MouseEvent) => {
    if (event.isTrusted) {
      const currentIndex = (event.target as HTMLButtonElement)?.getAttribute('data-index');
      if (currentIndex) {
        setModulesRefs({
          ...moduleRefs,
          [currentIndex]: !moduleRefs[currentIndex]
        });
      }
    }
  };

  const toggleSideBarVisibility = (event: MouseEvent) => {
    if (event.isTrusted) {
      setShowSideBar(!showSideBar);
    }
  };

  const adjustSideBarWidth = (width: number) => {
    setSideBarWidth(width);
  };

  useEffect(() => {
    if (sideBarWidth) {
      setSideBarFullScreen(sideBarDimensions.width === window.outerWidth);
    }
  }, [sideBarWidth]);

  useEffect(() => {
    if (onSideBarClose) {
      onSideBarClose(showSideBar);
    }
  }, [showSideBar]);

  useLayoutEffect(() => {
    adjustSideBarWidth(sideBarDimensions.width);
  }, [sideBarDimensions.width]);

  useLayoutEffect(() => {
    const newModulesRefs: SideBarModulesRefs = { };
    SideBarData.forEach((_data, index) => {
      Object.assign(newModulesRefs, {
        [index]: false
      });
    });
    setModulesRefs(newModulesRefs);
  }, []);

  return (
    <div ref={sideBarRef} className={useStyleModules(SideBarStyles.sideBar)} >
      {
        showToggler && typeof sideBarWidth !== 'undefined'
          ? <Button
            variant='dark'
            className={useStyleModules(
              SideBarStyles.sideBarToggler,
              isSideBarFullScreen ? SideBarStyles.sideBarTogglerFullWidth : String(),
              'no-shadow'
            )}
            style={ isSideBarFullScreen ? { right: 0 } : { left: sideBarWidth }}
            onClick={toggleSideBarVisibility}
            role='button'
            type='button'
            size='sm'>
            {showSideBar ? <BsChevronDoubleLeft /> : <BsChevronDoubleRight />}
          </Button>
          : null
      }
      <div className='d-grid d-lg-flex flex-wrap align-items-center px-3 px-0' style={{ height: 80 }}>
        <Image
          className={useStyleModules(SideBarStyles.sideBarLogo, 'd-block m-auto overflow-hidden')}
          alt='Smartblock'
          src='https://smartblock-static.s3.amazonaws.com/public-assets/smartblock-logo-white.svg'
          width={247}
          fluid />
      </div>
      <div className={useStyleModules(showSideBar ? '' : 'w-0', SideBarStyles.sideBarSub)}>
        {SideBarData.map((moduleData, index) =>
          <div key={index} className={SideBarStyles.moduleContainer} >
            <div className={useStyleModules('d-grid gap-2', 'px-2')}>
              <Button className={useStyleModules(SideBarStyles.togglerButton, moduleRefs[index] ? SideBarStyles.focused : SideBarStyles.base, 'nowrap')} data-index={index} onClick={toggleSubModuleVisibility}>
                <span className='d-flex justify-content-between'>
                  {moduleData.title}
                  <span>{moduleRefs[index] ? <BsChevronUp /> : <BsChevronDown />}</span>
                </span>
              </Button>
            </div>
            <div className={useStyleModules(SideBarStyles.linksContainer, 'mx-2') } >
              <ul className={useStyleModules(moduleRefs[index] ? SideBarStyles.shown : SideBarStyles.hidden)}>
                {moduleData.subModules.map((subModule, index) =>
                  <li key={index}>
                    <Link to={subModule.path} className={SideBarStyles.sideBarLink}>
                      {subModule.title}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={useStyleModules(SideBarStyles.preFooterLinksWrapper, 'w-100 px-2 py-0')}>
        <p className={useStyleModules(SideBarStyles.pureLinksContainer, 'mb-4')}>
          <Link
            className={useStyleModules(SideBarStyles.pureLink)}
            to='/about-cookies'>Acerca de las cookies</Link>
        </p>
        <p className={useStyleModules(SideBarStyles.pureLinksContainer, 'mb-4')}>
          <Link
            className={useStyleModules(SideBarStyles.pureLink)}
            to='/terms-of-service'>Términos y condiciones del servicio</Link>
        </p>
        <p className={useStyleModules(SideBarStyles.pureLinksContainer, 'mb-4')}>
          <Link
            className={useStyleModules(SideBarStyles.pureLink)}
            to='/privacy-policy'>Política de Privacidad</Link>
        </p>
      </div>
      <div className={useStyleModules(SideBarStyles.footer, 'px-2')}>
        <div className='d-flex justify-content-between'>
          <span>{'Smartblock Web App'}</span>
          <span>{Manifest.version}</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
