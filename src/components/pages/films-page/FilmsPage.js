import './FilmsPage.css'
import {useState} from "react";

export const FilmsPage = () => {
    const [nowInCinemaChosen, setNowInCinemaChosen] = useState(true);
    const films = [
        {
            image: 'barbie.png',
            title: 'Barbie'
        },
        {
            image: 'tor.png',
            title: 'Thor'
        },
        {
            image: 'flesh.png',
            title: 'Flesh'
        },
    ];

    const filmsNow = {
        "19 March": [
            {
                image: 'barbie.png',
                title: 'Barbie'
            },{
                image: 'barbie.png',
                title: 'Barbie'
            },{
                image: 'barbie.png',
                title: 'Barbie'
            }
        ],
        "20 March": [
            {
                image: 'tor.png',
                title: 'Thor'
            },
            {
                image: 'barbie.png',
                title: 'Barbie'
            },
            {
                image: 'flesh.png',
                title: 'Flesh'
            },
        ],
        "21 March": [
            {
                image: 'flesh.png',
                title: 'Flesh'
            },
        ],
        "22 March": [
            {
                image: 'tor.png',
                title: 'Thor'
            },
        ]
    };

    const handleChange = (value) => () => {
        setNowInCinemaChosen(value);
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {Object.keys(filmsNow).map((key, index) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h2>{key}</h2>
                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                {filmsNow[key].map((film, index) => (
                                    <div className={'film-container'}>
                                        <img className={'film-image'} src={film.image} alt={"Empty"}/>
                                        <div className={'film-title'}>{film.title}</div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))}
                    </div>

                    :
                    <div style={{display: "flex", flexWrap: "wrap", marginTop: '50px'}}>

                        {films.map((film, index) => (
                            <div className={'film-container'}>
                                <img className={'film-image'} src={film.image} alt={"Empty"}/>
                                <div className={'film-title'}>{film.title}</div>
                            </div>
                        ))}

                    </div>
            }

        </div>
    );
}