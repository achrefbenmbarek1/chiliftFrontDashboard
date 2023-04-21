import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ value, onChange }) => {
  return (
    <Searchbar
      placeholder="Search..."
      value={value}
      onChangeText={onChange}
      // onIconPress={onIconPress}
      iconColor="#000"
      style={{ marginHorizontal: 16, marginVertical: 16, height:50 }}
    />
  );
};

export default SearchBar;

