import "./Schedule.css"
import {Seat} from "./Seat";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../../../../store/slices/user-cart-slice";
import {seatTypes} from "../../../../../constants/constants";


export const Schedule = ({hall, ticketTypes, style, allowChoose}) => {
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    const [seatStyle, setSeatStyle] = useState({
        padding: '3px 5px',
        boxSizing: 'border-box'
    });
    const {selectedSeats} = useSelector(state => state.cart);

    useEffect(() => {
        const containerWidth = containerRef.current.clientWidth;
        setSeatStyle(prevSeatStyle => ({
            ...prevSeatStyle,
            width: `${containerWidth / maxSeatsCount()}px`,
            height: `${containerWidth / maxSeatsCount()}px`,
        }));

    }, []);

    function maxSeatsCount() {
        return Math.max(...hall.rows.map(row => row.seats.length));
    }

    const handleSelectSeat = (rowNumber, seatNumber) => () => {
        if (!allowChoose) return;

        const foundSeat = hall.rows.find(row => row.number === rowNumber)
            .seats.find(seat => seat.number === seatNumber);

        if (foundSeat.type === 3) return;
        if (selectedSeats.find(s => s.row === rowNumber && s.seat === seatNumber)) {
            dispatch(cartActions.unselectSeat({row: rowNumber, seat: seatNumber}));
            return;
        }

        dispatch(cartActions.selectSeat(
            {
                row: rowNumber,
                seat: seatNumber,
                price: ticketTypes[foundSeat.type].price
            }
        ));
    }


    return (
        <div className={'schedule-timetable'} style={style}>
            {hall.rows.map((row, index) => (
                <div className={'hall-row'} ref={containerRef} key={index}>
                    {row.seats.map((seat, index) => (
                        <div key={index} className={'hall-seat'} onClick={handleSelectSeat(row.number, seat.number)}>
                            <Seat seat={
                                selectedSeats.find(s => s.row === row.number && s.seat === seat.number) ?
                                    {...seat, type: 4} : seat
                            } seatTypes={seatTypes} seatStyle={seatStyle}></Seat>
                        </div>
                    ))}
                </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '30px'}}>
                {Object.keys(seatTypes).slice(0, -1).map((key, index) => (
                    <div key={index}>
                        <div>
                            <FontAwesomeIcon
                                style={{...seatStyle, color: seatTypes[key].color}}
                                icon={seatTypes[key].icon}/>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            {
                                ticketTypes[key].price ? ticketTypes[key].price :
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