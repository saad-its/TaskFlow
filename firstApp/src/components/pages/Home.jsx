import "./Home.css";
import Btn from "../common/Btn"
function Home() {
  let n = 20;
  let m = 10;
  return (
    <>
      <section>
        <h1>Welcome to Home Page {n + m} {"Welcome"} </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
          quaerat minus repellat distinctio necessitatibus fugiat dolorum vel
          rerum, alias ipsum itaque tempora dolorem sequi dolores, magni, maxime
          ratione nemo. Error?
        </p>
        <Btn value={"Read More"} color="red"/>
      </section>
      <section className="productSection">
        <h2>Our Product</h2>
        <div className="productMid">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </>
  );
}

export default Home;

function ProductCard() {
  return (
    <div className="productItem">
      <img src="/images/images1.jpg" alt="" />
      <h3>Image</h3>
      <Btn value={"View Details"} color="blue"/>
    </div>
  );
}
