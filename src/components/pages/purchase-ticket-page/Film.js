import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dateHelpers from "../../../utlis/dateHelpers";


export const Film = ({session}) => {

    const movie = session.movie;

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end',marginRight: '13%'}}>
                <div>
                    <img src={movie.image} style={{width: '150px', height: '180px', borderRadius: '10px'}} alt={"Not found"}/>
                </div>
                <div style={{display: "flex", flexDirection: "column", height: '100%', justifyContent: 'space-between'}}>
                    <div style={{fontSize: '20px', width: '50px'}}>{movie.title}</div>
                    <div className={'purchase-film-info'}>{session.technology}</div>
                </div>
                <div className={'purchase-film-info'}>{movie.age}+</div>
                <div className={'purchase-film-info'}>Hall {session.hall.id}</div>
            </div>
            <div style={{display: 'flex', fontSize: '25px', margin: '40px 0'}}>
                <div>
                    <FontAwesomeIcon icon={fas.faCalendar} style={{marginLeft: '10px'}}/>
                    {" " + dateHelpers.formatDate(session.date)}
                </div>
                <div style={{marginLeft: '30px'}}>
                    <FontAwesomeIcon icon={fas.faClock} style={{marginLeft: '10px'}}/>
                    {" " + session.time + "-" + dateHelpers.addMinutesToTime(session.time, session.movie.additionalInfo.duration)}
                </div>
            </div>

        </div>
    )
}