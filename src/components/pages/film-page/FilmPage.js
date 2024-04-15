import './FilmPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {moviesFilterActions} from "../../../store/slices/movies-filter-slice";

export const FilmPage = () => {
    const dispatcher = useDispatch();
    const skipProp = ['id']
    const {id} = useParams();
    const movie = useSelector(state => state.movies.movies.find(m => m.id.toString() === id.toString()));
    const showLessChars = 200;
    const [ifShowLess, setIfShowLess] = useState(true);



    const openTrailer = () => {
        window.open(movie.trailerLink, '_blank');
    }

    const handleTicketsClick = () => {
        dispatcher(moviesFilterActions.changeSelectedTitle(movie.title));
        dispatcher(moviesFilterActions.changeSelectedOption('month'));
    }

    return (
        <div>
            {
                movie &&
                <div className={'film-content'}>
                    <div className={'movie-header'}>
                        <div className={'movie-title'}>{movie.title}</div>
                        <div className={'movie-image'}><img src={movie.image} alt={'Not found'}/></div>

                        <button onClick={openTrailer}>
                            <FontAwesomeIcon className={'footer-icon'} icon={fas.faPlay}
                                             style={{width: "15px", height: "15px", marginRight: '5px'}}/>
                            Watch trailer
                        </button>
                    </div>

                    <div style={{width: '70%'}}>
                        <div className={'additional-movie-info'}>
                            <div>
                                {Object.keys(movie.additionalInfo).filter(k => !skipProp.includes(k)).map((key, index) => (
                                    <div key={index} style={{color: '#FFFFFF7D'}}>{key}</div>
                                ))}
                            </div>
                            <div style={{marginLeft: '20px'}}>
                                {Object.keys(movie.additionalInfo).filter(k => !skipProp.includes(k)).map((key, index) => (
                                    <div key={index}>{movie.additionalInfo[key]}</div>
                                ))}
                            </div>
                            <div style={{flexGrow: '1', display: 'flex', justifyContent: 'end'}}>
                                <button>
                                    <FontAwesomeIcon className={'footer-icon'} icon={fas.faTicket}
                                                     style={{width: "15px", height: "15px", marginRight: '5px'}}/>
                                    <Link to={"/schedule"} className={"link"} onClick={handleTicketsClick}>Tickets</Link>
                                </button>
                            </div>
                        </div>


                        <div className={'plot-container'}>
                            <div style={{fontSize: "25px", marginTop: "35px", marginBottom: "20px"}}>Plot</div>
                            <div
                                style={{width: '100%'}}>{ifShowLess ? movie.plot.substring(0, showLessChars) : movie.plot}</div>
                            <div style={{color: "grey", fontSize: '12px', marginTop: '5 px'}}
                                 onClick={() => setIfShowLess((prev) => !prev)}>{ifShowLess ? 'Show more' : "Show less"}</div>
                        </div>

                        <div style={{fontSize: "25px", marginTop: "35px", marginBottom: "20px"}}>Main roles</div>
                        <div className={'main-roles-container'}>
                            {movie.actors.map((actor, index) =>
                                <div className={'actor-container'} key={actor.id}>
                                    <div className={'actor-image-container'}>
                                        <img src={actor.image} alt={'not found'}/>
                                    </div>
                                    <div>{actor.name}</div>
                                </div>
                            )}
                        </div>

                        <div>
                            <div style={{fontSize: "25px", marginTop: "35px", marginBottom: "20px"}}>Comments</div>
                            <div className={'movie-comments-container'}>

                                {movie.comments.map((comment, index) => (
                                    <div className={'comment-item'} key={comment.id}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: 'space-between',
                                            marginBottom: '14px'
                                        }}>
                                            <div>
                                                {comment.author}
                                            </div>
                                            <div>
                                                {comment.rating}/10.0
                                            </div>
                                        </div>
                                        <div>{comment.comment}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}