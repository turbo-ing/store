import MobileNavbar from '../../../components/widgets/Header/MobileNavbar';
import DesktopNavbar from '../../../components/widgets/Header/DesktopNavbar';
import {useAccountStore} from "../../../lib/stores/accountStore";

export default function Header() {
  return (
    <>
      <DesktopNavbar autoconnect={true} />
      <MobileNavbar autoconnect={true} />
    </>
  );
}
