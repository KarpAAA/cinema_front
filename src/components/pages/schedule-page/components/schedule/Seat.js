import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Seat = ({seat, seatTypes, seatStyle}) => {


    return (
        <div>
            {
                seat.type === "None" ?
                    <div style={{...seatStyle, color: '#515254'}}></div>
                    :
                    seat.type !== "None" &&
                    <FontAwesomeIcon
                        style={{...seatStyle}}
                        color={seatTypes[seat.type].color}
                        icon={seatTypes[seat.type].icon}/>
            }
        </div>
    );
}