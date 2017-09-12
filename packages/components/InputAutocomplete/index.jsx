import React from 'react';
import uuid from 'uuid';
import Autocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import Text from '../Text';
import {
  calculateStyles,
} from '../lib/utils';
import {
  aquaHaze,
} from '../style/color';

const matchValueToItem = (item, value) =>
  item.toLowerCase().indexOf(value.toLowerCase()) !== -1;

const InputAutocomplete = ({
  input: {
    value,
    onChange,
  },
  onSelect,
  items,
  sortItems,
}) => {
  const renderItem = (item, isHighlighted) => {
    const style = calculateStyles({
      default: {
        padding: '2px 6px',
        cursor: 'default',
        display: 'block',
        position: 'relative',
      },
      isHighlighted: {
        color: 'white',
        background: `${aquaHaze}`,
        padding: '2px 6px',
        cursor: 'default',
      },
    }, {
      isHighlighted,
    });
    return (
      <div style={style}><Text
        key={uuid()}
      >
        {item}
      </Text></div>
    );
  };

  const inputStyle = {
    margin: '0 0 0 0',
    padding: '.5rem',
    fontSize: '.8rem',
    backgroundColor: '#fff',
    border: '1px solid #e6ebef',
    borderRadius: '2px',
    width: '100%',
  };

  const menuStyle = {
    margin: '0.25rem 0 0 0',
    backgroundColor: 'white',
    border: '1px solid #e6ebef',
    borderRadius: '2px',
    boxShadow: '0 1px 2px rgba(50, 59, 67, 0.3)',
    width: '100%',
    position: 'absolute',
  };

  const wrapperStyle = {
    display: 'flex',
    // flexDirection: 'column',
    width: '100%',
  };

  return (
    <div>
      <Autocomplete
        value={value}
        inputProps={{ id: 'states-autocomplete', style: inputStyle }}
        items={items}
        getItemValue={item => item}
        shouldItemRender={matchValueToItem}
        sortItems={sortItems}
        onChange={onChange}
        onSelect={onSelect}
        renderItem={renderItem}
        menuStyle={menuStyle}
        wrapperStyle={wrapperStyle}
      />
    </div>
  );
};

InputAutocomplete.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  sortItems: PropTypes.func.isRequired,
};

InputAutocomplete.defaultProps = {
  value: '',
  items: [],
};

export default InputAutocomplete;
