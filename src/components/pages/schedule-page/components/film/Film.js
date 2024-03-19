import './Film.css'

export const Film = ({film}) => {

    return (
        <div className={'movie'}>
            <div>
                <img src={'/barbie.png'} alt="Зображення"/>
            </div>
            <div className={'movieInfo'}>
                <div>
                    <div className={'filmTitle'}>{film.title}</div>
                    <div className={'movieDate'}>{film.dateTime}</div>
                </div>

                <div className={'technologiesContainer'}>
                    {Object.keys(film.sessions).map((key, ind) => (
                        <div className={'sessionsContainer'}>
                            <div>{key}</div>

                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                {
                                    film.sessions[key].map((session, index) => (
                                        <div
                                            className={'item' + (index + ind === 0 ? ' first-item' : '')}>
                                            {session.time}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}