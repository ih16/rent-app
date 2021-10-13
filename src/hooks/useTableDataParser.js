import { useState } from 'react';

export default function useTableDataParser() {
  const [data, setData] = useState();
  const setParsedData = products => {
    const parsedData = products.map((elem, index) => {
      return {
        ...elem,
        serial: index + 1,
        durability: `${elem.durability} / ${elem.max_durability}`,
        price: `$${elem.price}`,
      };
    });
    setData(parsedData);
  };

  return [data, setParsedData];
}
