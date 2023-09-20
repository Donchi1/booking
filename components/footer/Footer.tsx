import footerStyles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={footerStyles.footer}>
      <img src="/assets/imgs/donnybook.png" alt="logo" className="footerLogo" />
      <div className={footerStyles.fLists}>
        <ul className={footerStyles.fList}>
          <li className={footerStyles.fListItem}>Countries</li>
          <li className={footerStyles.fListItem}>Regions</li>
          <li className={footerStyles.fListItem}>Cities</li>
          <li className={footerStyles.fListItem}>Districts</li>
          <li className={footerStyles.fListItem}>Airports</li>
          <li className={footerStyles.fListItem}>Hotels</li>
        </ul>
        <ul className={footerStyles.fList}>
          <li className={footerStyles.fListItem}>Homes </li>
          <li className={footerStyles.fListItem}>Apartments </li>
          <li className={footerStyles.fListItem}>Resorts </li>
          <li className={footerStyles.fListItem}>Villas</li>
          <li className={footerStyles.fListItem}>Hostels</li>
          <li className={footerStyles.fListItem}>Guest houses</li>
        </ul>
        <ul className={footerStyles.fList}>
          <li className={footerStyles.fListItem}>Unique places to stay </li>
          <li className={footerStyles.fListItem}>Reviews</li>
          <li className={footerStyles.fListItem}>Unpacked: Travel articles </li>
          <li className={footerStyles.fListItem}>Travel communities </li>
          <li className={footerStyles.fListItem}>Seasonal and holiday deals </li>
        </ul>
        <ul className={footerStyles.fList}>
          <li className={footerStyles.fListItem}>Car rental </li>
          <li className={footerStyles.fListItem}>Flight Finder</li>
          <li className={footerStyles.fListItem}>Restaurant reservations </li>
          <li className={footerStyles.fListItem}>Travel Agents </li>
        </ul>
        <ul className={footerStyles.fList}>
          <li className={footerStyles.fListItem}>Curtomer Service</li>
          <li className={footerStyles.fListItem}>Partner Help</li>
          <li className={footerStyles.fListItem}>Careers</li>
          <li className={footerStyles.fListItem}>Press center</li>
          <li className={footerStyles.fListItem}>Safety Resource Center</li>
          <li className={footerStyles.fListItem}>Investor relations</li>
          <li className={footerStyles.fListItem}>Terms & conditions</li>
        </ul>
      </div>
      <div className={footerStyles.fText}>Copyright © 2022 Donnybook.</div>
    </div>
  );
};

export default Footer;
