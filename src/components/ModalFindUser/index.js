import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { Select, Spin, Input } from 'antd';
import './style.scss';

export default function ModalFindUser(props){
	const { fetching, optionas, visible, handleOk, handleCancel, handleChange, handleString, onPressEnter, showText, btnDisable, areaRef } = props;

	return (
		<React.Fragment>
			<Modal
				title="Поиск собеседника"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText = "Отмена"
				okButtonProps = { {disabled: btnDisable} }
			>

			<Select
				showSearch
        placeholder="Введите имя собеседника "
				onChange={ handleChange }
				onKeyUp = { handleString }
				style={{ width: '100%' }}
				notFoundContent={ fetching ? <Spin size="small" /> : null}
      >

        {optionas.map(item => (
          <Select.Option key={item._id} value={item.fullname} title={item._id} label = {item._id}>
            {item.fullname}
          </Select.Option>
        ))}
      </Select>

			{ showText && <Input.TextArea ref={areaRef} onChange = { onPressEnter } placeholder = "Введите сообщения пользователю" rows={6} /> }

			</Modal>
		</React.Fragment>	
	);
}

ModalFindUser.defaultProps = {
  value: []
}

ModalFindUser.propTypes = {
	visible: PropTypes.bool,
}