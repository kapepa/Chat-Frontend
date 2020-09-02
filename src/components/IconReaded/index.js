import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import OneCheck from '../../asset/img/check-symbol.svg';
import DubleCheck from '../../asset/img/double-tick-indicator.svg'

function Icon({condition, name}){
	return <img className="icon__readed" src={ condition ? OneCheck : DubleCheck } alt={name} />
}

Icon.propTypes = {
	condition: PropTypes.bool,
	name: PropTypes.string,
}

export default Icon
