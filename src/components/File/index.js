import React, { useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './style.scss';
import { fileAPI } from '../../utils/api/index';

function File(props){
	const { imageLoader } = props;
	const [state, setState] = useState({ fileList: [] })
	const [url, setUrl] = useState([])
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div className="ant-upload-text">Загрузить</div>
		</div>
	);

	const handleChange = ({ fileList }) => {
		setState({...state, fileList }
	)};

	const customRequest = async (props) => {
		const { file, onSuccess, onError } = props;
		const dataServer = await fileAPI.photo(file, onSuccess, onError);
		const updateFile = [...url]
		updateFile.push({url: dataServer.url, bytes: dataServer.bytes, original_filename: dataServer.original_filename, format: dataServer.format, public_id: dataServer.public_id});
		imageLoader(updateFile)
		setUrl(updateFile)
	}

	const onRemove = async (props) => {
		const { name, size } = props
		const del = url.find( el => `${el.original_filename}.${el.format}` === name && el.bytes === size );
		const answer =  await fileAPI.removePhoto(del.public_id);
		if(!answer.result) return null;
		const updateURL = [...url];
		const indexURL = updateURL.findIndex( el => el.public_id === answer.photo)
		updateURL.splice(indexURL,1);
		imageLoader(updateURL)
		setUrl(updateURL);
	}

	return (
		<div className="clearfix">
			<Upload
				listType="picture-card"
				fileList={state.fileList}
				onChange={handleChange}
				customRequest = {customRequest}
				onRemove = {onRemove}
			>
				{state.fileList.length >= 7 ? null : uploadButton}
			</Upload>
		</div>
	);
}

export default File;