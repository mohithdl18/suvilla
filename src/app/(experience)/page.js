import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import FeaturedRooms from "@/components/FeaturedRooms/FeaturedRooms";
// import WhyUs from "@/components/WhyUs/WhyUs";
import FeaturedBlogs from "@/components/FeaturedBlogs/FeaturedBlogs";
import Location from "@/components/Location/Location";
import Footer from "@/components/Footer/Footer";
import FeaturedAmenities from "@/components/FeaturedAmenities/FeaturedAmenities";
import Main from "@/components/Main/Main";
import NavbarMobile from "@/components/Navbar/MobileNavbar";
import MobileHero from "@/components/Hero/MobileHero";
import MobileFeaturedRooms from "@/components/FeaturedRooms/MobileFeaturedRooms";
import MobileFeaturedBlogs from "@/components/FeaturedBlogs/MobileFeaturedBlogs";

export default function Home() {
  return (
    <main className="bg-primary text-foreground">
      {/* <Navbar />
      <NavbarMobile /> */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="block md:hidden">
        <NavbarMobile />
      </div>

      <div className="hidden md:block">
        <Hero />
      </div>

      <div className="block md:hidden">
        <MobileHero />
      </div>

      {/* <Hero /> */}
      <Main />

      <div className="hidden md:block">
        <FeaturedRooms />
      </div>

      <div className="block md:hidden">
        <MobileFeaturedRooms />
      </div>


      <FeaturedAmenities />
      {/* <WhyUs /> */}

      <div className="hidden md:block">
        <FeaturedBlogs />
      </div>

      <div className="block md:hidden">
        <MobileFeaturedBlogs />
      </div>



      {/* <Location /> */}
      <Footer />
    </main>
  );
}