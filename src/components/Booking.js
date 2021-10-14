import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { FiAlertCircle, FiTool } from 'react-icons/fi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';
import Select from './Select';
import DatePicker from './DatePicker';

function Booking({
  products,
  setProducts,
  setConfirmModal,
  setRentedProducts,
  setBookingModal,
}) {
  const [formData, setFormData] = useState({
    productCode: '',
    fromDate: dayjs().format('YYYY-MM-DD'),
    toDate: '',
  });

  const [selectedProduct, setSelectedProduct] = useState();
  const [validationError, setValidationError] = useState();

  const handleBooking = e => {
    e.preventDefault();
    const { productCode, fromDate, toDate } = formData;
    const product = products.find(data => data.code === productCode);
    const rentPeriod = dayjs(toDate).diff(fromDate, 'day', true);
    if (rentPeriod <= 0 || rentPeriod < product.minimum_rent_period) {
      setValidationError('Invalid rent period');
      return;
    }
    setValidationError(undefined);
    const rentalFee = rentPeriod * product.price;
    const mileage = 10 * rentPeriod;
    const durabilityDeduction =
      product.type === 'plain' ? rentPeriod : rentPeriod * 4;
    const confrimMessage = (
      <span>
        {`Your estimated price is `}
        <strong>{`$${rentalFee}`}</strong>
      </span>
    );
    const addRentedProduct = () => {
      setRentedProducts(current => [
        ...current,
        {
          name: product.name,
          code: product.code,
          mileage,
          rent_period: rentPeriod,
          rental_fee: rentalFee,
          durability_deduction: durabilityDeduction,
        },
      ]);
      setProducts(current =>
        current.map(elem =>
          elem.code === productCode ? { ...elem, availability: false } : elem,
        ),
      );
      setConfirmModal({
        open: false,
      });
      setBookingModal(false);
    };
    setConfirmModal({
      title: 'Book a product',
      open: true,
      content: confrimMessage,
      action: addRentedProduct,
    });
  };

  const handleInputChange = event => {
    const { value, name } = event.target;
    setFormData(current => {
      return { ...current, [name]: value };
    });
  };

  useEffect(() => {
    setSelectedProduct(
      products.find(data => data.code === formData.productCode),
    );
  }, [formData.productCode]);

  useEffect(() => {
    if (selectedProduct)
      setFormData(current => ({
        ...current,
        toDate: dayjs(formData.fromDate)
          .add(selectedProduct.minimum_rent_period, 'day')
          .format('YYYY-MM-DD'),
      }));
  }, [selectedProduct]);

  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleBooking} id="bookingForm" className="my-4 w-full">
        <div className="flex w-full items-center">
          <Select
            required
            placeholder="Select product"
            value={formData.productCode}
            onChange={handleInputChange}
            label="Select Product"
            options={products.filter(elem => elem.availability === true)}
            name="productCode"
          />
          {selectedProduct && (
            <>
              <div className="mx-4">
                <DatePicker
                  required
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  label="From"
                  name="fromDate"
                />
              </div>
              <DatePicker
                required
                value={formData.toDate}
                onChange={handleInputChange}
                label="To"
                name="toDate"
              />
            </>
          )}
        </div>
        {selectedProduct && (
          <div className="flex flex-col mt-6 ml-2 fadeInEffect">
            <div className="text-lg mb-1 font-medium">
              {selectedProduct.name}
            </div>
            <div className="flex items-center text-sm my-0.5">
              <span className="mr-2 mt-0.5 text-gray-400">
                <IoCalendarOutline />
              </span>
              <span className="text-gray-500 mr-2">Minimum Rental Period:</span>
              <span>{selectedProduct.minimum_rent_period}</span>
            </div>
            <div className="flex items-center text-sm my-0.5">
              <span className="mr-2 mt-0.5 text-gray-400">
                <BsSpeedometer2 />
              </span>
              <span className="text-gray-500 mr-2">Mileage: </span>
              <span>{selectedProduct.mileage || 0}</span>
            </div>
            <div className="flex items-center text-sm my-0.5">
              <span className="mr-2 mt-0.5 text-gray-400">
                <FiTool />
              </span>
              <span className="text-gray-500 mr-2">Need to fix: </span>
              <span
                className={`${
                  selectedProduct.needing_repair ? 'bg-red-50' : 'bg-green-50'
                } ${
                  selectedProduct.needing_repair
                    ? 'text-red-600'
                    : 'text-green-600'
                } py-1 px-3 rounded-full text-xs`}
              >
                {selectedProduct.needing_repair ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        )}
      </form>
      {validationError && (
        <div className="bg-yellow-50 p-3 mt-2 rounded text-red-600 w-full flex items-center fadeInEffect">
          <FiAlertCircle />
          <span className="ml-2">{validationError}</span>
        </div>
      )}
    </div>
  );
}

Booking.propTypes = {
  products: PropTypes.array,
  setConfirmModal: PropTypes.func,
  setRentedProducts: PropTypes.func,
  setProducts: PropTypes.func,
  setBookingModal: PropTypes.func,
};

export default Booking;
