import Footer from "../components/Footer/Footer";
import Items from "../components/ItemsList/ItemsList";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

export default function Home() {
    return (
      <div className="Home">
          <Header />
          <Menu />
          <Items 
             itemsPerPage={6}
             gridColumns={6}
             title="Featured Items"
             showArrows={true}
           />
          <Footer />
      </div>
    );
  }