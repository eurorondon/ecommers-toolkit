import React from "react";

const Product = (props) => {
  // const MAX_TITLE_LENGTH = 17;
  const MAX_DESCRIPTION_LENGTH = 40;

  return (
    <div className="bg-white  rounded-md  md:mb-0 md:mr-4 md:last:mr-0">
      <div className="mx-auto">
        <img className="w-50 md:w-40 mx-auto" src={props.url} alt="product " />
      </div>

      <div className="p-1">
        <h5 className="font-bold text-blue-900 text-sm 2xl:text-lg truncate">
          {props.name}
        </h5>
        <div className="">
          {props.description ? (
            <p className="text-sm description">
              {props.description.length > MAX_DESCRIPTION_LENGTH
                ? props.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                : props.description}
            </p>
          ) : (
            <p className="text-sm">Sin Descripción</p>
          )}
        </div>

        <p className="text-base ">{props.price} $</p>
      </div>
    </div>
  );
};

export default Product;
