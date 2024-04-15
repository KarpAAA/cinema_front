import './FilmsPage.css'
import {useSelector} from "react-redux";
import {selectMovies, selectNowMovies, selectSoonMovies} from "../../../store/slices/movie-slice";
import {Link} from "react-router-dom";
import {useState} from "react";

export const FilmsPage = () => {

    const [nowInCinemaChosen, setNowInCinemaChoosen] = useState(true);
    const nowMovies = useSelector(selectNowMovies);
    const soonMovies = useSelector(selectSoonMovies);


    const handleChange = (value) => () => {
        setNowInCinemaChoosen(value);
    }

    return (
        <div className={'films-page-content'}>
            <div style={{display: "flex"}}>
                <div className={`films-button${nowInCinemaChosen ? '-selected' : ''}`} onClick={handleChange(true)}>Now
                    in cinema
                </div>
                <div className={`films-button${!nowInCinemaChosen ? '-selected' : ''}`}
                     onClick={handleChange(false)}>Soon
                </div>
            </div>

            {
                nowInCinemaChosen ?
                    <div style={{display: "flex", flexWrap: "wrap", marginTop: '50px'}}>
                        {
                            nowMovies.length === 0 &&
                            <div style={{height: "400px", width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{fontSize: '40px'}}>
                                    Empty...
                                </div>
                            </div>
                        }
                        {nowMovies.map((film, index) => (
                            <div key={film.id} className={'film-container'}>
                                <Link to={`/film/${film.id}`} className={'link'}>
                                    <img className={'film-image'} src={film.image} alt={"Empty"}/>
                                    <div className={'film-title'}>{film.title}</div>
                                </Link>

                            </div>
                        ))}

                    </div>

                    :
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {Object.keys(soonMovies).map((key, index) => (
                            <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                                <h2>{key}</h2>
                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    {soonMovies[key].map((film, index) => (
                                        <div key={film.id} className={'film-container'}>
                                            <Link to={`/film/${film.id}`} className={'link'}>
                                                <img className={'film-image'} src={film.image} alt={"Empty"}/>
                                                <div className={'film-title'}>{film.title}</div>
                                            </Link>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ))}
                    </div>
            }

        </div>
    );
}