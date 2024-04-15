import './SchedulePage.css';
import {FilmsFilter} from "./components/filmsFilter/FilmsFilter";
import {Film} from "./components/film/Film";
import {Schedule} from "./components/schedule/Schedule";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useGetSessionsQuery} from "../../../store/api";
import {scheduledSessionsDecorator} from "../../../store/slices/session-slice";

const SchedulePage = () => {
    const filterOptions = useSelector(state => state.moviesFilter);
    const [sessions, setSessions] = useState([]);
    const {data: sessionsData} = useGetSessionsQuery();
    const [selectedSession, setSelectedSession] = useState();

    useEffect(() => {
        if(sessionsData){
            setSessions(scheduledSessionsDecorator(sessionsData, filterOptions));
        }
    }, [sessionsData,filterOptions]);

    const handleSelectedSession = (id) => {
        if (!id) setSelectedSession(null);
        if(sessionsData){
            const session = sessionsData.find(s => s.id === id);
            setSelectedSession(session);
        }

    }
    return (
        <div className={'schedule-content'}>
            <div className={'filters-container'}>
                <FilmsFilter></FilmsFilter>
            </div>

            <div style={{display: "flex", flexDirection: 'column'}}>
                {Object.keys(sessions).map((date, index) => (
                    <div key={index}>
                        {date}
                        <div className={'films-container'}>
                            {Object.keys(sessions[date]).map((filmId, index) => (
                                <Film
                                    key={filmId}
                                    filmId={filmId}
                                    sessions={sessions[date][filmId]}
                                    setSelectedSession={handleSelectedSession}
                                ></Film>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={'schedule-container'}
                 style={{width: '200px'}}>
                {selectedSession &&
                    <div style={{position: 'fixed'}}>
                        <Schedule
                            hall={selectedSession.hall}
                            ticketTypes={selectedSession.ticketTypes}
                        >
                        </Schedule>
                    </div>
                }

            </div>

        </div>
    );
}

export default SchedulePage;


