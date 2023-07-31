import React from "react";
import { Link } from "react-router-dom";

const Categorias = () => {
  const categories = [
    {
      name: "Destacados",
      products: 8,
      imageUrl: "/images/iphone.png",
    },
    {
      name: "Hola",
      products: 5,
      imageUrl: "/images/audifonos.png",
    },
    {
      name: "Camara",
      products: 12,
      imageUrl: "/images/camara.png",
    },
    {
      name: "Luces",
      products: 12,
      imageUrl: "/images/luces.png",
    },
    {
      name: "Computador",
      products: 12,
      imageUrl: "/images/mouse.png",
    },
    {
      name: "Todos",
      products: 12,
      imageUrl: "/images/todos.png",
    },
    {
      name: "Juegos",
      products: 12,
      imageUrl: "/images/juegos.png",
    },
    {
      name: "streaming",
      products: 12,
      imageUrl: "/images/streaming.png",
    },
    {
      name: "Sonido",
      products: 12,
      imageUrl: "/images/sonido.png",
    },

    {
      name: "Coleccionables",
      products: 12,
      imageUrl: "/images/coleccionables.png",
    },
    // Agrega más categorías según sea necesario
  ];
  if (window.innerWidth > 1150)
    return (
      <div
        className="my-5"
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#D8EAF2",
        }}
        id="categorias"
      >
        {categories.map((category, index) => (
          <div key={index} style={{ margin: "10px", textAlign: "center" }}>
            <Link
              to={`/categories/${category.name}`}
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
            </Link>
            <div style={{ marginTop: "10px" }}>{category.name}</div>
          </div>
        ))}
      </div>
    );
  if (window.innerWidth < 1150 && window.innerWidth > 768)
    return (
      <div className="py-4">
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#D8EAF2",
          }}
          id="categorias"
        >
          {categories.slice(0, 5).map((category, index) => (
            <div key={index} style={{ margin: "10px", textAlign: "center" }}>
              <Link
                to={`/categories/${category.name}`}
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
              </Link>
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
          {categories.slice(5, 10).map((category, index) => (
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
      </div>
    );
  if (window.innerWidth < 769)
    return (
      <div
        className="my-4 py-3"
        style={{ backgroundColor: "#D8EAF2" }}
        id="categorias"
      >
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
              <Link
                to={`/categories/${category.name}`}
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
              </Link>
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
          {categories.slice(5, 9).map((category, index) => (
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
