import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import {AnimatedWord} from './animated-word';

export const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 20,
      backgroundColor: state.isFocused ? 'gray' : 'white',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      fontSize: 52.5,
      padding: 0,
      margin: 0,
      display: "inline",
      color: "black",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className="search-bar">
      {search === null ? (
        <span className="search-text">...whether it's&nbsp;<AnimatedWord/> in </span>
      ) : (
        <span className="search-text">weather in </span>
      )}
      <AsyncPaginate 
        placeholder="another city <"
        debounceTimeout={600}
        value={search}
        width={250}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={customStyles}
        className='react-select-container'
        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
      />
    </div>
  );
};
