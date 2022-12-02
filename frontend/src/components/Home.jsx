import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/carrito");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>Nuevos productos</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image?.url} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Añadir al carrito
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Cargando...</p>
      ) : (
        <p>Ocurrio un error inesperado...</p>
      )}
    </div>
  );
};

export default Home;
