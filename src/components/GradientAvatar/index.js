import React from 'react';
import PropTypes from "prop-types";
import Tinycolor2 from 'tinycolor2';
import './style.scss';

function GradientAvatar({ name }){
	const firstCharacter = name.substr(0,1);
	const twoCharacter = name.substr(0,2).replace(firstCharacter, firstCharacter.toUpperCase());
	const derivedCode = twoCharacter.split("").map((el) => {
		return el.charCodeAt() < 100 ? el.charCodeAt() * 2 : el.charCodeAt()
	})
	return(
		<div className="avarat__gradient" style={{background: `linear-gradient(135deg, ${Tinycolor2(`#`+derivedCode[0]).lighten(50).toString()}, #${derivedCode[1]})`}} >
			<span className="avarat__gradient-character">{twoCharacter}</span>	
		</div>
	)
}

GradientAvatar.propTypes = {
	name: PropTypes.string,
}

export default GradientAvatar;