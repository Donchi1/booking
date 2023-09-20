import Featured from "@/components/featured/Featured";
import FeaturedProperties from "@/components/featuredProperties/FeaturedProperties";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MailList from "@/components/mailList/MailList";
import Navbar from "@/components/navbar/Navbar";
import Offers from "@/components/offers/Offers";
import PropertyList from "@/components/propertyList/PropertyList";
import homeStyles from "@/styles/Home.module.css";

const Home = () => {

  return (
    <div className={homeStyles.home}>
      <Navbar /> 
      <Header type=""/>
      <div className={homeStyles.homeContainer}>

        <h1 className={homeStyles.homeTitle}>Offers</h1>
       
        <Offers />
        <Featured/>
        <h1 className={homeStyles.homeTitle}>Browse by property type</h1>
        <PropertyList/>
        <h1 className={homeStyles.homeTitle}>Homes guests Featured</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
