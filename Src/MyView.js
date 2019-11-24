import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ViewPropTypes
} from 'react-native'; // Added ViewPropTypes

const MyView = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};

MyView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
  //style: View.propTypes.style,  //original
  style: ViewPropTypes.style,
  hide: PropTypes.bool,
};

export default MyView;