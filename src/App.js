import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { BiUndo, BiRefresh } from 'react-icons/bi';
import { RiHealthBookLine } from 'react-icons/ri';
import Fuse from 'fuse.js';
import Button from './components/Button';
import Input from './components/Input';
import Table, { Column } from './components/Table';
import { staticData } from './utils/statcData';
import Modal from './components/Modal';
import Booking from './components/Booking';
import useLocalStorage from './hooks/useLocalStorage';
import useTableDataParser from './hooks/useTableDataParser';
import ConfrimDialogue from './components/ConfrimDialogue';
import Return from './components/Return';
import './App.css';

function App() {
  const [tableData, setTableData] = useTableDataParser();
  const [products, setProducts] = useLocalStorage('products', staticData);
  const [rentedProducts, setRentedProducts] = useLocalStorage(
    'rented_products',
    [],
  );
  const [confirmModal, setConfirmModal] = useState({
    title: null,
    open: false,
    content: null,
    action: null,
  });

  const [bookingModal, setBookingModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const [search, setSearch] = useState('');

  const fuse = new Fuse(products, {
    threshold: 0.3,
    keys: ['name', 'code'],
  });

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleResetData = () => {
    window.localStorage.removeItem('products');
    window.localStorage.removeItem('rented_products');
    setProducts(staticData);
  };

  useEffect(() => {
    setTableData(products);
  }, [products]);

  useEffect(() => {
    if (search) {
      const searchedValues = fuse.search(search);
      setTableData(searchedValues.map(searchedValue => searchedValue.item));
    } else setTableData(products);
  }, [search]);

  return (
    <div className="min-w-screen flex justify-center py-4 min-h-screen font-sans bg-gray-100 overflow-hidden">
      {bookingModal && (
        <Modal
          title="Book a Product"
          setModalState={setBookingModal}
          content={
            <Booking
              products={products}
              setConfirmModal={setConfirmModal}
              setRentedProducts={setRentedProducts}
              setProducts={setProducts}
              setBookingModal={setBookingModal}
            />
          }
          buttonJustify="end"
          form="bookingForm"
        />
      )}
      {returnModal && (
        <Modal
          buttonJustify="end"
          setModalState={setReturnModal}
          title="Return a Product"
          form="returnForm"
          content={
            <Return
              rentedProducts={rentedProducts}
              setConfirmModal={setConfirmModal}
              setProducts={setProducts}
              setRentedProducts={setRentedProducts}
              setReturnModal={setReturnModal}
            />
          }
        />
      )}
      {confirmModal.open && (
        <ConfrimDialogue
          title={confirmModal.title}
          state={confirmModal}
          setState={setConfirmModal}
        />
      )}

      <div className="container max-w-7xl">
        <div className="flex justify-between items-end w-full">
          <Button onClick={handleResetData} icon={<BiRefresh />} color="yellow">
            Reset Data
          </Button>
          <Input
            value={search}
            onChange={handleSearchChange}
            icon={<BsSearch />}
            placeholder="Search"
          />
        </div>
        <div>
          <Table data={tableData}>
            <Column title="#" dataIndex="serial" width="w-20" />
            <Column title="Name" dataIndex="name" width="w-52" />
            <Column title="Code" dataIndex="code" width="w-32" />
            <Column title="Availability" dataIndex="availability" />
            <Column title="Need to Repair" dataIndex="needing_repair" />
            <Column title="Durability" dataIndex="durability" width="w-48" />
            <Column title="Mileage" dataIndex="mileage" />
            <Column title="Price" dataIndex="price" />
          </Table>
        </div>
        <div className="flex items-center justify-end pt-2 w-full">
          <Button
            onClick={() => setBookingModal(true)}
            color="blue"
            className="mr-2"
            icon={<RiHealthBookLine />}
          >
            Book
          </Button>
          <Button
            onClick={() => setReturnModal(true)}
            icon={<BiUndo />}
            color="purple"
          >
            Return
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
