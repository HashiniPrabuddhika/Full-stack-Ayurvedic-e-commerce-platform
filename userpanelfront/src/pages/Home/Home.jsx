import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TrustBadges from "../../components/TrustBadges/TrustBadges";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/ProductDisplay/ProductDisplay";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import BrandStory from "../../components/BrandStory/BrandStory";
import Testimonials from "../../components/Testimonials/Testimonials";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />

      <div className="container">
        <TrustBadges />
      </div>

      <FeaturedProducts />

      <div className="container py-4">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} searchText="" />
      </div>

      <WhyChooseUs />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;