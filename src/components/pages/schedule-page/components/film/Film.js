import './Film.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectMovies} from "../../../../../store/slices/movie-slice";
import React from "react";

export const Film = ({filmId, sessions, setSelectedSession}) => {
    const film = useSelector(selectMovies).find(film => film.id.toString() === filmId);
    const {isLoggedIn} = useSelector(state => state.user);
    const handleSessionClicked = (id) => (e) => {
        setSelectedSession(id);
    }
    return (
        <div className={'movie'}>
            <div>
                <img src={film.image} alt="Зображення"/>
            </div>
            <div className={'movieInfo'}>
                <div>
                    <div className={'filmTitle'}><Link to={`/film/${film.id}`} className={'link'}>{film.title}</Link>
                    </div>
                </div>

                <div className={'technologiesContainer'}>
                    {Object.keys(sessions).map((key, ind) => (
                        sessions[key].length !== 0 && (
                            <div className={'sessionsContainer'} key={ind}>
                                <div>{key}</div>

                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    {sessions[key].map((session, index) => (
                                        <div
                                            key={session.id}
                                            onMouseEnter={handleSessionClicked(session.id)}
                                            onMouseLeave={handleSessionClicked(null)}
                                            className={'item' + (index + ind === 0 ? ' first-item' : '')}>
                                            <Link
                                                to={`/purchase/${session.id}`}
                                                className={'menu-link'}
                                                onClick={isLoggedIn ? null: (e) => e.preventDefault()}>
                                                {session.time}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

        </div>
    )
}