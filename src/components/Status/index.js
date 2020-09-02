import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function Status({status}){
	return(
		<React.Fragment>
			{status ? <React.Fragment> <div className="status-symbol green"></div><div className="status status-online">online</div></React.Fragment> : <React.Fragment><div className="status-symbol red"></div><div className="status status-offline">offline</div></React.Fragment>}
		</React.Fragment>
	)
}

Status.propTypes = {
	status: PropTypes.bool,
}

export default Status;