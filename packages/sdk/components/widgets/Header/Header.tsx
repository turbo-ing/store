import MobileNavbar from '../../../components/widgets/Header/MobileNavbar';
import DesktopNavbar from '../../../components/widgets/Header/DesktopNavbar';
import Updater from '../../framework/Updater/ChainUpdater';

export default function Header() {
  return (
    <>
      <Updater />
      <DesktopNavbar autoconnect={true} />
      <MobileNavbar autoconnect={true} />
    </>
  );
}
