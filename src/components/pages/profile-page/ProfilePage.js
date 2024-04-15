import './ProfilePage.css'
import {Operations} from "./components/Operations";
import {ProfileInput} from "./components/ProfileInput";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useDispatch, useSelector} from "react-redux";
import {saveUserData, userActions} from "../../../store/slices/user-slice";
import dateHelpers from "../../../utlis/dateHelpers";
import stringHelpers from "../../../utlis/stringHelpers";
import {useGetUserOperationsQuery} from "../../../store/api";


export const ProfilePage = () => {
    const skipProfileKeys = ['id', 'email', 'role', 'birthdate'];

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const {data: operations} = useGetUserOperationsQuery(user.id);

    console.log(operations);
    const handleProfileInputsChange = (field) => (event) => {
        dispatch(userActions.changeUserState({field, value: event.target.value}));
    }

    const handleProfileBirthdateChange = (date) => {
        dispatch(userActions.changeUserState({field: 'birthdate', value: dateHelpers.dateToISOFormat(date)}));
    }

    return (

        <div className={'profile-page-content'}>

            <Operations
                operations={
                    operations ? operations.filter(operation => !dateHelpers.isPastDate(operation.sessionDate)) : []
                }
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

                    {Object.keys(user).filter(key => !skipProfileKeys.includes(key)).map((key, index) => (
                        <div style={{width: '50%', boxSizing: 'border-box'}} key={index}>
                            <ProfileInput
                                value={user[key] ? user[key] : ''}
                                labelText={stringHelpers.capitalizeFirstLetter(key)}
                                inputChangeEvent={handleProfileInputsChange(key)}>
                            </ProfileInput>
                        </div>

                    ))}

                    <div className="input-wrapper" style={{width: '50%', boxSizing: 'border-box'}}>
                        <label htmlFor="city">Birthdate<span style={{color: 'red'}}> *</span></label>
                        <DatePicker
                            className={'profile-input'}
                            selected={user.birthdate}
                            onChange={handleProfileBirthdateChange}/>
                    </div>



                </div>
                <div className="input-wrapper" style={{width: '40%', boxSizing: 'border-box'}}>
                    <button
                        onClick={() => {
                            dispatch(saveUserData(user));
                        }}
                        style={{
                            width: "20%",
                            backgroundColor: "#282727",
                            padding: '10px 20px',
                            fontSize: '15px',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            pointer: 'click'
                        }}>Save</button>
                </div>

            </div>

            <Operations
                operations={
                    operations ? operations.filter(operation => dateHelpers.isPastDate(operation.sessionDate)) : []
                }
                title={'Operations history'}>
            </Operations>
        </div>
    );
}