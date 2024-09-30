// import './App.css'
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeSlider from "./HomeSlider";
import Carousel from "./CaroCont";
import HeaderNavi from "./HeadNav";

function App() {
  return (
    <div className="m-2">
      
      <Header />
      <HeaderNavi />
      <HomeSlider />
      <Carousel />
     
    </div>
  );
}

export default App;
