import React from "react";

const Categorias = () => {
  const categories = [
    {
      name: "Audio",
      products: 8,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883430/ecommers%20electronic/71tQ8TWWh6L-removebg-preview_nyikao.png",
    },
    {
      name: "phones",
      products: 5,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883525/ecommers%20electronic/adios-iphone-15-pro-max-bienvenido-iphone-15-ultra-removebg-preview_xtwp47.png",
    },
    {
      name: "Gaming",
      products: 12,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883729/ecommers%20electronic/619MOiWtl_L._AC_UF1000_1000_QL80_-removebg-preview_uwjdqj.png",
    },
    {
      name: "Music",
      products: 12,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883729/ecommers%20electronic/D_NQ_NP_661518-MLV53986588581_022023-W-removebg-preview_egyy85.png",
    },
    {
      name: "Computa",
      products: 12,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883430/ecommers%20electronic/71tQ8TWWh6L-removebg-preview_nyikao.png",
    },
    {
      name: "Juegos",
      products: 12,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883525/ecommers%20electronic/adios-iphone-15-pro-max-bienvenido-iphone-15-ultra-removebg-preview_xtwp47.png",
    },
    {
      name: "Cableado",
      products: 12,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883729/ecommers%20electronic/619MOiWtl_L._AC_UF1000_1000_QL80_-removebg-preview_uwjdqj.png",
    },
    {
      name: "negro",
      products: 12,
      imageUrl:
        "https://res.cloudinary.com/dpgpmqo6c/image/upload/v1686883729/ecommers%20electronic/D_NQ_NP_661518-MLV53986588581_022023-W-removebg-preview_egyy85.png",
    },
    // Agrega más categorías según sea necesario
  ];
  if (window.innerWidth > 1150)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#D8EAF2",
        }}
      >
        {categories.map((category, index) => (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#CCCCCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>{category.name}</div>
          </div>
        ))}
      </div>
    );
  if (window.innerWidth < 1150 && window.innerWidth > 768)
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D8EAF2",
          }}
        >
          {categories.slice(0, 5).map((category, index) => (
            <div key={index} style={{ margin: "10px", textAlign: "center" }}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#CCCCCC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div style={{ marginTop: "10px" }}>{category.name}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D8EAF2",
          }}
        >
          {categories.slice(0, 5).map((category, index) => (
            <div key={index} style={{ margin: "10px", textAlign: "center" }}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#CCCCCC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div style={{ marginTop: "10px" }}>{category.name}</div>
            </div>
          ))}
        </div>
      </>
    );
  if (window.innerWidth < 769)
    return (
      <div className="my-4 py-3" style={{ backgroundColor: "#D8EAF2" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "#D8EAF2",
            margin: "10px 0px",
          }}
        >
          {categories.slice(0, 4).map((category, index) => (
            <div key={index} style={{ margin: "5px", textAlign: "center" }}>
              <div
                style={{
                  width: "20vw",
                  height: "20vw",
                  borderRadius: "50%",
                  backgroundColor: "#CCCCCC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div style={{ marginTop: "" }}>{category.name}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D8EAF2",
          }}
        >
          {categories.slice(0, 4).map((category, index) => (
            <div key={index} style={{ margin: "5px", textAlign: "center" }}>
              <div
                style={{
                  width: "20vw",
                  height: "20vw",
                  borderRadius: "50%",
                  backgroundColor: "#CCCCCC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div style={{ marginTop: "" }}>{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Categorias;
