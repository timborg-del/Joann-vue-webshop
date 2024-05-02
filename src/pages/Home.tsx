import ItemList from "../components/ItemList";



const Home = () => {
  return (
    <div>
      <h2>Welcome to Your Online Store</h2>
      <p>
        This is the homepage of your online store. You can provide a brief introduction to your store,
        showcase featured products, or include any other relevant information here.
      </p>
      <ItemList></ItemList>
    </div>
  );
};

export default Home;
