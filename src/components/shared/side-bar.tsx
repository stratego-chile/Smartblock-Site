import { FC, useState, useLayoutEffect, MouseEvent, Ref } from 'react';
import SideBarStyles from 'styles/modules/side-bar.module.sass';
import { Image, Button } from 'react-bootstrap';
import { useStyleModules } from 'helpers/props';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { SideBarData } from 'components/utils/sidebar-links';
import Manifest from '../../../package.json';
import { Link } from 'react-router-dom';

type SideBarModulesRefs = Record<string, boolean>;

export type SideBarProps = {
  showSideBar?: boolean;
  nativeRef?: Ref<HTMLDivElement>
};

const SideBar: FC<SideBarProps> = (props: SideBarProps) => {

  const { showSideBar, nativeRef } = props;
  
  const [moduleRefs, setModulesRefs] = useState<SideBarModulesRefs>({});

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
    <div ref={nativeRef} className={SideBarStyles.sideBar}>
      <div className='d-grid d-lg-flex flex-wrap align-items-center' style={{ height: 80 }}>
        <Image
          className='d-block m-auto'
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
            <div className={useStyleModules(moduleRefs[index] ? SideBarStyles.shown : SideBarStyles.hidden, SideBarStyles.linksContainer, 'mx-2') } >
              <ul>
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
