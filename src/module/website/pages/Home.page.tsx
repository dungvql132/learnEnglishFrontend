import React, { useState } from "react";
import Header from "../compoments/common/Header.compoment";
import Footer from "../compoments/common/Footer.compoment";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import HomeServiceMenu from "../menus/HomeService.menu";
import ViewWord from "../compoments/word/ViewWord.compoment";
import CreateWord from "../compoments/word/CreateWord.compoment";

const menuContent = {
  view_word: <ViewWord></ViewWord>,
  create_word: <CreateWord></CreateWord>,
};

const HomePage = () => {
  const [Content, setContent] = useState(null);
  function handleChangeMenu(event) {
    setContent(menuContent[event.key]);
  }

  return (
    <div className="home-page">
      <Header />
      <TwoColumnLayout
        CustomMenu={
          <HomeServiceMenu
            handleChangeMenu={handleChangeMenu}
          ></HomeServiceMenu>
        }
        CustomContent={Content}
      ></TwoColumnLayout>
      <Footer />
    </div>
  );
};

export default HomePage;
