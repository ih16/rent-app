import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BsSpeedometer2 } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';
import Select from './Select';

function Return({
  rentedProducts,
  setRentedProducts,
  setProducts,
  setConfirmModal,
  setReturnModal,
}) {
  const [productCode, setProductCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState();
  const confrimMessage = (
    <span>
      {`Your total price is `}
      <strong>{`$${selectedProduct?.rental_fee}`}</strong>
    </span>
  );

  const handleReturn = e => {
    e.preventDefault();

    const returnProduct = () => {
      setProducts(current =>
        current.map(elem =>
          elem.code === productCode
            ? {
                ...elem,
                availability: true,
                mileage: elem.mileage + selectedProduct.mileage,
                durability:
                  elem.durability - selectedProduct.durability_deduction,
              }
            : elem,
        ),
      );

      setRentedProducts(current =>
        current.filter(elem => elem.code !== productCode),
      );

      setConfirmModal({
        open: false,
      });

      setReturnModal(false);
    };

    setConfirmModal({
      title: 'Return a product',
      open: true,
      content: confrimMessage,
      action: returnProduct,
    });
  };

  const handleSelectChange = event => {
    setProductCode(event.target.value);
  };
  useEffect(() => {
    setSelectedProduct(rentedProducts.find(elem => elem.code === productCode));
  }, [productCode]);
  return (
    <form onSubmit={handleReturn} id="returnForm" className="my-4 w-full">
      <div className="flex w-full items-center">
        <Select
          required
          value={productCode}
          onChange={handleSelectChange}
          placeholder="Select product"
          label="Select Product"
          options={rentedProducts}
          name="productCode"
        />
      </div>
      {selectedProduct && (
        <div className="flex flex-col mt-6 ml-2 fadeInEffect">
          <div className="text-lg mb-1 font-medium">{selectedProduct.name}</div>
          <div className="flex items-center text-sm my-0.5">
            <span className="mr-2 mt-0.5 text-gray-400">
              <IoCalendarOutline />
            </span>
            <span className="text-gray-500 mr-2">Rent Period:</span>
            <span>{selectedProduct.rent_period}</span>
          </div>
          <div className="flex items-center text-sm my-0.5">
            <span className="mr-2 mt-0.5 text-gray-400">
              <BsSpeedometer2 />
            </span>
            <span className="text-gray-500 mr-2">Mileage: </span>
            <span>{selectedProduct.mileage || 0}</span>
          </div>
        </div>
      )}
    </form>
  );
}

Return.propTypes = {
  rentedProducts: PropTypes.array,
  setRentedProducts: PropTypes.func,
  setProducts: PropTypes.func,
  setConfirmModal: PropTypes.func,
  setReturnModal: PropTypes.func,
};
export default Return;
