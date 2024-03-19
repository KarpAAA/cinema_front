

export const ProfileInput = ({labelText, inputChangeEvent, value}) => {

    return (
        <div className="input-wrapper">
            <label htmlFor="city">{labelText}<span style={{color: 'red'}}> *</span></label>
            <input onChange={inputChangeEvent} id="city" className="profile-input" value={value}/>
        </div>
    );
}