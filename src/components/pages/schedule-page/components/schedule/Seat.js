
export const Seat = ({seat, seatTypes, seatStyle}) => {

    return (
        <div> {
            seat.type === "None" ?
            <div style={{...seatStyle, color: '#515254'}}/> : seatTypes[seat.type].view
        }
        </div>
    );
}