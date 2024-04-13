import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRadio } from '../../features/Search/SearchSlice';
import { getRadio } from '../../features/Search/SearchSlice';

function RadioButtonSearch() {
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('');
    const search = useSelector(getRadio)


  useEffect(() => {
    setSearchType(search);
  }, [dispatch]);

  const setSearchTypeRedux = (item) => {
    dispatch(setRadio(item));
  }

  return (
    <>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="search"
            value="vehicle"
            checked={search === 'vehicle'}
            onChange={() => setSearchTypeRedux('vehicle')}
          />
          Vehicle No.
        </label>
        <label>
          <input
            type="radio"
            name="search"
            value="challan"
            checked={search === 'challan'}
            onChange={() => setSearchTypeRedux('challan')}
          />
          Challan No.
        </label>
      </div>
    </>
  );
}

export default RadioButtonSearch;
