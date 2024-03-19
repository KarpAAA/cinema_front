import "./Schedule.css"
import {Seat} from "./Seat";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
export const Schedule = ({session}) => {

    const containerRef = useRef(null);
    const [seatStyle, setSeatStyle] = useState({
        padding: '3px 5px',
        boxSizing: 'border-box'
    });

    useEffect(() => {
        const containerWidth = containerRef.current.clientWidth;
        setSeatStyle(prevSeatStyle => ({
            ...prevSeatStyle,
            width: `${containerWidth / maxSeatsCount()}px`,
            height: `${containerWidth / maxSeatsCount()}px`,
        }));
    }, []);


    const seatTypes =
        {
            "VIP": {
                price: 360,
                view:  <FontAwesomeIcon
                    style={{...seatStyle, color: '#D6B356'}}
                    icon={fas.faUser}/>
            },
            "Common": {
                price: 120,
                view: <FontAwesomeIcon
                    style={{...seatStyle, color: 'white'}}
                    icon={fas.faUser}/>
            },
            "Unavailable": {
                price: 0,
                view: <FontAwesomeIcon
                    style={{...seatStyle, color: '#515254'}}
                    icon={fas.faUser}/>
            },
            "Cripple": {
                price: 100,
                view: <FontAwesomeIcon
                    style={{...seatStyle, color: '#4CA9D1'}}
                    icon={fas.faWheelchair}/>
            }
        };


    function maxSeatsCount() {
        return Math.max(...session.rows.map(row => row.seats.length));
    }

    function completeSeats(rows) {
        let maxSeats = maxSeatsCount();

        rows.forEach(row => {
            if (row.seats.length < maxSeats) {
                for (let i = 0; i < maxSeats; i++) {
                    if (!row.seats.find(seat => seat.number === i + 1)) {
                        row.seats.push({
                            number: i + 1,
                            type: "None"
                        });
                    }
                }
            }
            row.seats.sort((s1, s2) => s1.number - s2.number);
        });

        return rows;
    }

    return (
        <div className={'schedule-timetable'}>
            {completeSeats(session.rows).map((row, index) => (
                <div className={'hall-row'} ref={containerRef}>
                    {row.seats.map((seat, index) => (
                        <div className={'hall-seat'}>
                            <Seat seat={seat} seatTypes={seatTypes} seatStyle={seatStyle}></Seat>
                        </div>
                    ))}

                </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '30px'}}>
                {Object.keys(seatTypes).map((key, index) => (
                    <div>
                        <div>{seatTypes[key].view}</div>
                        <div style={{textAlign: 'center'}}>
                            {seatTypes[key].price ? seatTypes[key].price :
                                <FontAwesomeIcon
                                    style={{color: '#585859'}}
                                    icon={fas.faBan}/>
                            }
                        </div>
                    </div>

                ))}
            </div>
        </div>


    );
}