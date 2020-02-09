import React, { useState, useCallback } from 'react';
import Autocomplete from 'react-autocomplete';
import { searchApi } from '../../services/homeAPIActions';
import { debounce } from 'lodash';

import * as actionTypes from '../../store/actionTypes';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBar.css';
import { useDispatch } from 'react-redux';

const SearchBar = props => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const debounceLoadData = useCallback(
    debounce((_dispatch, value) => _dispatch(searchApi(value)), 1000),
    []
  );

  const handleOnInputChange = event => {
    const { value } = event.target;
    setQuery(value);
    debounceLoadData(dispatch, value);
  };

  const handleOnSelect = (value, seleted) => {
    dispatch({
      type: actionTypes.LOCATION_AUTOCOMPLATE_SELECTED,
      payload: { id: seleted.Key, name: seleted.LocalizedName }
    });
    setQuery(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 margin-auto">
          <div className="auto-complate">
            <AiOutlineSearch style={{ margin: 10 }} />
            <Autocomplete
              items={props.items}
              shouldItemRender={(result, query) =>
                result.LocalizedName.toLowerCase().indexOf(
                  query.toLowerCase()
                ) > -1
              }
              onChange={handleOnInputChange}
              value={query}
              getItemValue={result => result.LocalizedName}
              autoHighlight={false}
              onSelect={handleOnSelect}
              renderItem={(result, highlighted) => (
                <div
                  key={result.Key}
                  style={{
                    backgroundColor: highlighted ? '#eee' : 'transparent',
                    color: highlighted ? '#4682b4' : '#000',
                    padding: '3px 10px'
                  }}
                >
                  {result.LocalizedName}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
