import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru'
import classNames from "classnames";
import { IconReaded, GradientAvatar  } from '../../components/index';
import waveSVG from '../../asset/img/Combined Shape.svg';
import pauseSvg from '../../asset/img/iconfinder_icon-ios7-pause_211791.svg';
import playSVG from '../../asset/img/iconfinder_play-arrow_326577.svg';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const Message = (props) => {
	const { avatar, name, text, date, isReaded, attachments = [], isTyping, isAudio, userID, isMeToken, removeMessage, messageID } = props;
	const isMe = isMeToken === userID;
	const audioRef = useRef(null);
	const [isPlayng, setIsPlayng] = useState(false);
	const togglePlay = (e) => {
		if (isPlayng) {
			audioRef.current.pause();
			setIsPlayng(false);
		} else {
			audioRef.current.play();
			setIsPlayng(true);
		}
	}
	useEffect(() => {
		if(audioRef.current){
			let timer;
			let percent = 0;
			let audio = audioRef.current.closest(".message__audio").querySelector("audio");
			let fieldTime = audioRef.current.closest(".message__audio").querySelector(".message__audio-duration");
			fieldTime.currentTime = "00:00"
			audioRef.current.addEventListener("canplay", function(_event){
				_event.target.duration.toFixed(2);
			});
			audioRef.current.addEventListener("playing", function(_event) {
				let duration = _event.target.duration;
				advance(duration, audio);
			});
			audioRef.current.addEventListener("pause", function(_event) {
				clearTimeout(timer);
			});
			audioRef.current.addEventListener("ended",function(_event) {
				let duration = _event.target.duration.toFixed(2);
				let progress = audioRef.current.closest(".message__audio").querySelector(".message__audio-progress");
				fieldTime.innerHTML = duration;
				progress.style.width = "100%";
				setIsPlayng(false);
				clearTimeout(timer);
			})
			let advance = function(duration, element) {
				let progress = audioRef.current.closest(".message__audio").querySelector(".message__audio-progress");
				let increment = 10/duration;
				fieldTime.innerHTML = element.currentTime.toFixed(2)
				percent += increment;
				percent = increment * element.currentTime * 10;
				progress.style.width = percent+'%'
				startTimer(duration, element);
			}
			let startTimer = function(duration, element){ 
				if(percent < 100) {
					timer = setTimeout(function (){advance(duration, element)}, 100);
				}
			}
		}
	})
	return (
		<div className={classNames("message", {
			"message--isme": isMe,
			"message--is-typing": isTyping, 
			"message--is-attach": attachments.length > 0,
			"message--image": attachments.length === 1 && !(typeof text === "string"),
			"message--is-audio": isAudio.url,
			})}>
			<div className="message__avatar">
				{ isMe && <Button onClick = { e => { removeMessage(messageID, userID, date) } } className = "message__btn-del" type="link"><CloseOutlined /></Button> }
				{ avatar ? <img src={avatar} alt={`Avatar ${name}`} />	: <GradientAvatar name={name} /> }
			</div>
			<div className="message__content">
				<div className={classNames("message__content-wrap", {"message__content-wrap-reverse": isMe})}>
					{ (text || isAudio.url) && 
						<div className="message__bubble">
							{ text && <p className="message__text">{text}</p>}
							{ isAudio.url && 
								<div className={classNames("message__audio",{"message__audio-isMe": isMe})}>
									<audio ref={audioRef} controls>
										<source src = {isAudio.url} type={`audio/${isAudio.original_extension}`} />
									</audio> 
									<div className="message__audio-progress"></div>
									<div className="message__audio-btn">
										<button onClick={togglePlay}>
											{isPlayng ? <img src={playSVG} alt="play svg" /> : <img src={pauseSvg} alt="pause svg" />}
										</button>
									</div>
									<img className="message__audio-wave" src={waveSVG} alt="wave svg" />
									<span className="message__audio-duration">
										00:00
									</span>
								</div>
							}
						</div>
					}
					{ isTyping && 
						<div className="message__is-typing">
							<div className="loading">
								<span className="dot one"></span>
								<span className="dot two"></span>
								<span className="dot three"></span>
							</div>
						</div>
					}
					{ attachments.length !== 0 &&
						<div className= {classNames("message__attachments",{"message__attachments-isme": isMe})}>
							{ attachments.map( el => {
								return (
									<img key={el.url} src={el.url} alt={el.filename? el.filename : el.format}/>
								)
							}) }
						</div>
					}
				</div>
				{ (text || attachments.length === 1)  && <span className={classNames("message__date",{ "message__date-isme": isMe })}>{distanceInWordsToNow(Date.parse(date),{addSuffix: true, locale: ruLocale})}</span>}
			</div>
			{ isMe ? <IconReaded condition={isReaded} name={name} /> : ""}
		</div>
	)
}

Message.defaultProps = {
	name: "noname",
	attachments: [],
};

Message.propTypes ={
	avatar: PropTypes.any,
	text: PropTypes.string,
	date: PropTypes.string,
	name: PropTypes.string,
	attachments : PropTypes.array,
	isTyping: PropTypes.bool,
	isAudio: PropTypes.any,
}

export default Message;