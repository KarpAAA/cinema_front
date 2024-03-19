import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";


export const Operations = ({operations, title}) => {

    const [operationsState, setOperationsState] = useState(
        Object.fromEntries(
            operations.map(operation => [operation.id.toString(), false])
        )
    )

    return (
        <div>
            <div className={'profile-page-header'}>
                {title}
            </div>

            <div className={'profile-board'}>
                <div className={'profile-board-title-container'} style={{width: '25%'}}>
                    <div>Operation date</div>
                    <div>Movie</div>
                </div>

                <div className={'profile-board-title-container'}
                     style={{width: '45%', justifyContent: 'space-between'}}>
                    <div>Session date</div>
                    <div>Tickets</div>
                    <div>Bar</div>
                    <div>Price</div>
                    <div></div>
                </div>
            </div>


            <div>
                {operations.map((operation, index) => (

                    <div className={'operation'}>

                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div className={'profile-board-title-container'} style={{width: '25%'}}>
                                <div>{operation.date}</div>
                                <div>{operation.movie}</div>
                            </div>

                            <div className={'profile-board-title-container'}
                                 style={{width: '45%', justifyContent: 'space-between'}}>
                                <div>{operation.sessionDate}</div>
                                <div>{operation.tickets.length}</div>
                                <div>{operation.bar.length}</div>
                                <div>{operation.price}</div>
                                <div>
                                    <button
                                        style={{
                                            border: 'none',
                                            borderRadius: '50%', width: '30px', height: '30px',
                                            backgroundColor:
                                                operationsState[operation.id.toString()] ? '#782624': 'white'
                                            }}
                                        onClick={() => {
                                            setOperationsState(prevState => {
                                                const newState = {...prevState}; // Клонуємо попередній стан
                                                newState[operation.id.toString()] = !newState[operation.id.toString()]; // Оновлюємо значення для поточного operation
                                                return newState; // Повертаємо новий стан
                                            });
                                        }}>
                                        {
                                            operationsState[operation.id.toString()] ?
                                                <FontAwesomeIcon
                                                    className={'footer-icon'}
                                                    icon={fas.faArrowUp}
                                                    style={{fontSize: '15px'}}/>
                                                :
                                                <FontAwesomeIcon
                                                    className={'footer-icon'}
                                                    icon={fas.faArrowDown}
                                                    style={{fontSize: '15px', color: "black"}}/>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        {operationsState[operation.id.toString()]&&
                            <div style={{display: "flex"}}>
                                <div style={{marginTop: '20px'}}>
                                    <div style={{color: 'white', fontSize: '18px'}}>№ Operation</div>
                                    <div style={{marginTop: '10px', fontSize: '16px'}}>{operation.id}</div>
                                </div>

                                <div style={{marginTop: '20px', marginLeft: '70px'}}>
                                    <div style={{color: 'white', fontSize: '18px'}}>Tickets</div>
                                    <div style={{marginTop: '10px', fontSize: '16px'}}>
                                        {operation.tickets.map((ticket, index) => (
                                            <div>Row {ticket.row}, seat {ticket.seat}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }

                    </div>

                ))}
            </div>

        </div>
    );
}