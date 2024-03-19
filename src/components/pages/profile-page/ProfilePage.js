import './ProfilePage.css'
import {Operations} from "./Operations";
import {ProfileInput} from "./ProfileInput";
import {useState} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ProfilePage = () => {
    const [user, setUserState] = useState(
        {
            city: 'Lviv',
            email: "user@example.com",
            phone: '0961236578',
            name: "User Surname",
            birthdate: "11.05.2004"
        }
    );

    const operations = [
        {
            id: 20013,
            date: "19.03.2024 19:40",
            movie: "Thor",
            sessionDate: '21.03.2024',
            tickets: [
                {
                    row: 2,
                    seat: 2,
                    price: 100
                },
                {
                    row: 2,
                    seat: 2,
                    price: 100
                }
            ],
            bar: [],
            price: 200,

        },
        {
            id: 20014,
            date: "19.03.2024 19:40",
            movie: "Thor",
            sessionDate: '21.03.2024',
            tickets: [
                {
                    row: 2,
                    seat: 2,
                    price: 100
                },
                {
                    row: 2,
                    seat: 2,
                    price: 100
                }
            ],
            bar: [],
            price: 200,

        },
        {
            id: 20015,
            date: "19.03.2024 19:40",
            movie: "Thor",
            sessionDate: '21.03.2024',
            tickets: [
                {
                    row: 2,
                    seat: 2,
                    price: 100
                },
                {
                    row: 2,
                    seat: 2,
                    price: 100
                }
            ],
            bar: [],
            price: 200,

        },
        {
            id: 20016,
            date: "19.03.2024 19:40",
            movie: "Thor",
            sessionDate: '18.03.2024',
            tickets: [
                {
                    row: 2,
                    seat: 2,
                    price: 100
                },
                {
                    row: 2,
                    seat: 2,
                    price: 100
                }
            ],
            bar: [],
            price: 200,

        }

    ]

    const isPastDate = (sessionDate) => {
        const currentDate = new Date();
        const parts = sessionDate.split('.');
        const targetDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

        return currentDate > targetDate;
    }
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    return (

        <div className={'profile-page-content'}>

            <Operations
                operations={operations.filter(operation => !isPastDate(operation.sessionDate))}
                title={'Tickets and bar'}>
            </Operations>


            <div>
                <div className={'profile-page-header'}>
                    Profile
                </div>

                <div style={{fontSize: '12px', color: 'gray', marginBottom: '20px'}}>
                    With a phone number, you can see all your orders. Mail is required for backup access to the office.
                </div>

                <div style={{display: 'flex', width: '40%', flexWrap: 'wrap'}}>

                    {Object.keys(user).filter(key => key !== 'birthdate').map((key, index) => (
                        <div style={{width: '50%', boxSizing: 'border-box'}}>
                            <ProfileInput
                                value={user[key]}
                                labelText={capitalizeFirstLetter(key)}
                                inputChangeEvent={(e) => {
                                    setUserState(prevState => {
                                        const newState = {...prevState};
                                        newState[key] = e.target.value;
                                        return newState;
                                    })
                                    console.log(user);
                                }}>
                            </ProfileInput>
                        </div>

                    ))}


                    <div className="input-wrapper" style={{width: '50%', boxSizing: 'border-box'}}>
                        <label htmlFor="city">Birthdate<span style={{color: 'red'}}> *</span></label>
                        <DatePicker
                            className={'profile-input'}
                            selected={user.birthdate} onChange={date => {
                            setUserState(prevState => {
                                const newState = {...prevState};
                                newState.birthdate = date;
                                return newState;
                            })
                        }} />
                    </div>


                </div>



            </div>

            <Operations
                operations={operations.filter(operation => isPastDate(operation.sessionDate))}
                title={'Operations history'}>
            </Operations>
        </div>
    );
}