import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import { createMessageChat, getChats, getChatMessages } from '../../redux/actions/chat.actions';
import './Messages.scss';

const Messages = ({dispatch, chatGroups, activeUser, postError, chatMessages}) => {

    const [chatMessage, setChatMessage] = useState({message: '', messageOwner: activeUser._id, chatGroup: ''});
    const [chatSelected, setChatSelected] = useState({});

    useEffect(() =>{
        dispatch(getChats(activeUser._id))
    }, []);

    const selectGroup = (group) =>{
        dispatch(getChatMessages(group.id))
        setChatSelected(group)
    }

    console.log(chatMessages);

    const handleMessage = (ev) =>{
        const {name, value} = ev.target;
        setChatMessage({...chatMessage, [name]: value})
        console.log(chatMessage);
    };

    const submitMessage = (ev) =>{
        ev.preventDefault();
        setChatMessage({message: '', messageOwner: activeUser._id, chatGroup: chatSelected.id})
        dispatch(createMessageChat(chatMessage))
    }

    return (<div id="container-all">
	<aside>
		<ul>
            {
                (chatGroups)
                ?
                chatGroups.map(element =>{
                    return <li className={(element.id === chatSelected.id) ? 'selected-chat' : 'chats'} onClick={() =>{selectGroup(element)}} key={element.id}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                    <div>
                        <h2>{element.name}</h2>
                        <h3>
                            <span className="status orange"></span>
                            Invitados: {element.guests}
                        </h3>
                    </div>
                </li>
                })
                :
                ''
            }

		</ul>
	</aside>
	<main>
		<ul id="chat">
            {(chatMessages.length >0)
            ?
            chatMessages.map(element =>{
                return 	<li className="you">
				<div className="entete">
					<span className="status green"></span>
					<h2>{element.owner}</h2>
					<h3>10:12AM, Today</h3>
				</div>
				<div className="message">
					{element.message}
				</div>
			</li>
            })
            :
            <p>No hay mensajes que mostrar</p>}

		</ul>
		<footer>
			<textarea placeholder="Escribe tu mensaje"
                name="message"
                id="message"
                value={chatMessage.message}
                onChange={handleMessage}
                >
            </textarea>
            <Button type="submit"
                    variant='contained'
                    onClick={submitMessage}
                    sx={{mt:0, mb: 1}}>Enviar
            </Button>
		</footer>
	</main>
    </div>
)
/*     <section className="messages">
            <div className="messages__container">
                <aside>
                    <button>
                        {
                            (chatGroups)
                            ?

                        chatGroups.map(element =>{
                            return <div className={(element.id === chatSelected.id) ? 'user-active' : 'user'} data-id="2" onClick={() =>{selectGroup(element)}} key={element.id}>
                            <div className="avatar">
                                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" srcSet=""></img>
                            </div>
                            <div className="details">
                                <div className="name">
                                    <h3>{element.name}</h3>
                                </div>
                                <div className="message">
                                    <h6>Invitados: {element.guests}</h6>
                                </div>
                            </div>
                        </div>
                        })
                        :
                        <h1>No estás invitado a ningun chat</h1>
                    }
                </button>
                    <button>
                </button>
                </aside>


                <div className="chat">

                    <header>
                        <nav>
                            <ul>
                            {(postError)
                        ?
                        <p className='message-error'>Debes seleccionar un grupo de chat antes de escribir</p>
                        :
                        ''}
                            </ul>
                        </nav>
                    </header>

                    <div className="message">
                        <form id="chat-form">
                            <input
                            type="text"
                            name="message"
                            id="message"
                            value={chatMessage.message}
                            placeholder="Escribe tu mensaje"
                            onChange={handleMessage} />

                            <Button type="submit"
                            variant='contained'
                            onClick={submitMessage}
                            sx={{mt:2, mb: 2}}>Enviar</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section> */
};
const mapStateToProps = (state) => ({
    chatGroups: state.chat.chatGroup,
    activeUser: state.auth.user,
    postError: state.chat.postError,
    chatMessages: state.chat.chatMessages
})
export default connect(mapStateToProps)(Messages);