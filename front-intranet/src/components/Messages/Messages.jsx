import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { getChats } from '../../redux/actions/chat.actions';
import './Messages.scss';

const Messages = ({dispatch, chatGroups, activeUser}) => {

    const [isOwnerOrGuest, setIsOwnerOrGuest] = useState(false)

    useEffect(() =>{
        dispatch(getChats(activeUser._id))

    }, []);

    console.log('Grupo de chat->',chatGroups);
    console.log('USUARIO ACTIVO->', activeUser);

    return <section className="messages">
            <div className="messages__container">
                <aside>
                    <button>
                        {/* DIV A RECORRER */}
                        {
                            (chatGroups)
                            ?

                        chatGroups.map(element =>{
                            return <div className="user" data-id="2">
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
                            </ul>
                        </nav>
                    </header>
                    {/* ENTER MESSAGE */}
                    <div className="message">
                        <form id="chat-form">
                            <input type="text" name="message" id="message" placeholder="Type een bericht" />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
};
const mapStateToProps = (state) => ({
    chatGroups: state.chat.chatGroup,
    activeUser: state.auth.user
})
export default connect(mapStateToProps)(Messages);