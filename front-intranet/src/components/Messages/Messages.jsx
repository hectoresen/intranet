import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import { createMessageChat, getChats } from '../../redux/actions/chat.actions';
import './Messages.scss';

const Messages = ({dispatch, chatGroups, activeUser, postError}) => {

    const [chatMessage, setChatMessage] = useState({message: '', messageOwner: activeUser._id, chatGroup: ''});
    const [chatSelected, setChatSelected] = useState({});

    useEffect(() =>{
        dispatch(getChats(activeUser._id))
    }, []);

    const selectGroup = (group) =>{setChatSelected(group)}

    const handleMessage = (ev) =>{
        const {name, value} = ev.target;
        setChatMessage({...chatMessage, [name]: value})
        console.log(chatSelected);
    };

    const submitMessage = (ev) =>{
        ev.preventDefault();
        setChatMessage({message: '', messageOwner: activeUser._id, chatGroup: chatSelected.id})
        dispatch(createMessageChat(chatMessage))
    }

    return <section className="messages">
            <div className="messages__container">
                <aside>
                    <button>
                        {/* DIV A RECORRER */}
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

                {/* CHAT */}
                <div className="chat">
                    {/* BG */}
                    <img src="./assets/background.jpg" alt="background"></img>
                    <ul>
                    </ul>
                    {/* NAV */}
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
                    {/* ENTER MESSAGE */}
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
        </section>
};
const mapStateToProps = (state) => ({
    chatGroups: state.chat.chatGroup,
    activeUser: state.auth.user,
    postError: state.chat.postError
})
export default connect(mapStateToProps)(Messages);