export default function Product(props) {
  const MAX_TITLE_LENGTH = 17; // El número máximo de caracteres permitidos en el título
  const MAX_DESCRIPTION_LENGTH = 40; // El número máximo de caracteres permitidos en la descripción\

  return (
    <div className=" card  text-start mx-1 " style={{ borderRadius: "15px" }}>
      <div className="mx-auto" style={{ maxWidth: "14rem" }}>
        <img className="img-fluid" src={props.url} alt="product image" />
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
