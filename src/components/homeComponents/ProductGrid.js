export default function Product(props) {
  const MAX_TITLE_LENGTH = 17; // El número máximo de caracteres permitidos en el título
  const MAX_DESCRIPTION_LENGTH = 40; // El número máximo de caracteres permitidos en la descripción\

  return (
    <div
      className=" card my-1 text-start  "
      style={
        window.innerWidth > 767
          ? { marginBottom: "40px", borderRadius: "15px" }
          : { margin: " 0px 1px  60px 1px", borderRadius: "10px" }
      }
    >
      <div className="mx-auto">
        <img
          className="product--image"
          src={props.url}
          alt="product image"
          style={
            window.innerWidth > 1615
              ? { maxWidth: "13rem" }
              : { maxWidth: "10rem" }
          }
        />
      </div>

      <div className="p-2" style={{ backgroundColor: "" }}>
        <h5 className="name" style={{ fontWeight: "bold", color: "#00789D" }}>
          {props.name}
        </h5>
        <div
          className=""
          // style={
          //   window.innerWidth > 767 ? { height: "50px" } : { height: "40px" }
          // }
        >
          {props.description ? (
            <p className="description">
              {props.description.length > MAX_DESCRIPTION_LENGTH
                ? props.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                : props.description}
            </p>
          ) : (
            <p className="description"> Sin Descripcion</p>
          )}
        </div>

        <p className="price" style={{ fontWeight: "" }}>
          {props.price} $
        </p>
      </div>
    </div>
  );
}
