import styles from './FilmPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as fal from "@fortawesome/free-brands-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export const FilmPage = ({}) => {
    const showLessChars = 200;
    const [ifShowLess, setIfShowLess] = useState(true);
    const movie = {
        image: "barbie.png",
        title: "Barbie",
        trailerLink: "https://www.youtube.com/watch?v=pBk4NYhWNMM",

        additionalInfo: {
            year: 2023,
            country: "USA",
            genre: "Comedy, melodrama, fantasy",
            producer: "Noa Baymach",
            scenario: "America Ferrera",
            rental: "20.07.2023-02.08.2023",
            duration: "120 minutes"
        },
        plot: "In the wonderland of Barbieland, everything has to be perfect. Barbie (Margot Robbie) did not meet the high demands of this world, so she went to the world of people. Not conforming to beauty standards is a sentence in Barbieland. On the other hand, in order to be happy among people, you need to have a completely different set of qualities. Fantasy, comedy and melodrama - this is how you can describe the new movie \"Barbie\" about the world-famous doll.",

        mainRoles: [
            {
                photo: "ryan_gosley.png",
                name: "Ryan Gosley"
            },
            {
                photo: "ryan_gosley.png",
                name: "Ryan Gosley"
            },
            {
                photo: "ryan_gosley.png",
                name: "Ryan Gosley"
            }
        ],

        comments: [
            {
                author: "Oleh Samchushun",
                comment: "This film is a real masterpiece. It captivates from the first minutes and keeps you in suspense until the very end. The script is well developed, and the acting is simply fascinating. The visual side of the film is incredible, every frame looks like a picturesque masterpiece.",
                rating: 9.5
            },
            {
                author: "Oleh Samchushun",
                comment: "This film is a real masterpiece. It captivates from the first minutes and keeps you in suspense until the very end. The script is well developed, and the acting is simply fascinating. The visual side of the film is incredible, every frame looks like a picturesque masterpiece.",
                rating: 9.5
            },
            {
                author: "Oleh Samchushun",
                comment: "This film is a real masterpiece. It captivates from the first minutes and keeps you in suspense until the very end. The script is well developed, and the acting is simply fascinating. The visual side of the film is incredible, every frame looks like a picturesque masterpiece.",
                rating: 9.5
            },
            {
                author: "Oleh Samchushun",
                comment: "This film is a real masterpiece. It captivates from the first minutes and keeps you in suspense until the very end. The script is well developed, and the acting is simply fascinating. The visual side of the film is incredible, every frame looks like a picturesque masterpiece.",
                rating: 9.5
            }
        ]

    };

    const openTrailer = () => {
        window.open(movie.trailerLink, '_blank');
    }

    return (
        <div className={'film-content'}>
            <div className={'movie-header'}>
                <div className={'movie-title'}>{movie.title}</div>
                <div className={'movie-image'}><img src={movie.image}/></div>

                <button onClick={openTrailer}>
                    <FontAwesomeIcon className={'footer-icon'} icon={fas.faPlay}
                                     style={{width: "15px", height: "15px", marginRight: '5px'}}/>
                    Watch trailer
                </button>
            </div>

            <div style={{width: '70%'}}>
                <div className={'additional-movie-info'}>
                    <div>
                        {Object.keys(movie.additionalInfo).map((key, index) => (
                            <div style={{color: '#FFFFFF7D'}}>{key}</div>
                        ))}
                    </div>
                    <div style={{marginLeft: '20px'}}>
                        {Object.keys(movie.additionalInfo).map((key, index) => (
                            <div>{movie.additionalInfo[key]}</div>
                        ))}
                    </div>
                    <div style={{flexGrow: '1', display: 'flex', justifyContent: 'end'}}>
                        <button>
                            <FontAwesomeIcon className={'footer-icon'} icon={fas.faTicket}
                                             style={{width: "15px", height: "15px", marginRight: '5px'}}/>
                            Tickets
                        </button>
                    </div>
                </div>


                <div className={'plot-container'}>
                    <div style={{fontSize: "25px", marginTop: "35px", marginBottom: "20px"}}>Plot</div>
                    <div style={{width: '100%'}}>{ifShowLess ? movie.plot.substring(0, showLessChars): movie.plot}</div>
                    <div style={{color: "grey", fontSize: '12px', marginTop: '5 px'}}
                        onClick={() => setIfShowLess((prev) => !prev)}>{ifShowLess ? 'Show more' : "Show less"}</div>
                </div>

                <div style={{fontSize: "25px", marginTop: "35px", marginBottom: "20px"}}>Main roles</div>
                <div className={'main-roles-container'}>

                    {movie.mainRoles.map((actor, index) => (
                        <div className={'actor-container'} style={{}}>
                            <div className={'actor-image-container'}>
                                <img src={actor.photo} alt={'not found'}/>
                            </div>
                            <div>{actor.name}</div>
                        </div>
                    ))}
                </div>

                <div>
                    <div style={{fontSize: "25px", marginTop: "35px", marginBottom: "20px"}}>Comments</div>
                    <div className={'movie-comments-container'}>

                        {movie.comments.map((comment, index) => (
                            <div className={'comment-item'}>
                                <div style={{display: "flex", justifyContent: 'space-between', marginBottom: '14px'}}>
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
    );
}