import styles from './SchedulePage.css';
import {useState} from "react";
import {FilmsFilter} from "./components/filmsFilter/FilmsFilter";
import {Film} from "./components/film/Film";
import {Schedule} from "./components/schedule/Schedule";
import {sessionTest} from "./sessionTest";

const SchedulePage = () => {

    const films = [
        {
            title: "Barbie",
            dateTime: "27 may, Saturday",
            sessions: {
                "2D": [sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest]
            }
        },
        {
            title: "Barbie",
            dateTime: "27 may, Saturday",
            sessions: {
                "2D": [sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest]
            }
        },
        {
            title: "Barbie",
            dateTime: "27 may, Saturday",
            sessions: {
                "2D": [sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest,sessionTest]
            }
        }
    ];
    const [selectedOption, setSelectedOption] = useState("today");
    const [technologyOptions, setTechnologyOptions] = useState({
        "2D": false,
        "3D": false,
    });

    const [ageOptions, setAgeOptions] = useState({
        "0+": false,
        "18+": false,
    });

    return (
        <div className={'schedule-content'}>
            <div className={'filters-container'}>
                <FilmsFilter
                    ageOptions={ageOptions}
                    setAgeOptions={setAgeOptions}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    setTechnologyOptions={setTechnologyOptions}
                    technologyOptions={technologyOptions}
                ></FilmsFilter>
            </div>

            <div className={'films-container'}>
                {films.map((film, index) => (
                    <Film film={film}></Film>
                ))}

            </div>
            <div className={'schedule-container'}
                 style={{width: '300px'}}>
                <Schedule session={films[0].sessions["2D"][0]}></Schedule>
            </div>

        </div>
    );
}

export default SchedulePage;


