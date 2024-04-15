

export const ProfileInput = ({labelText, inputChangeEvent, value}) => {

    return (
        <div className="input-wrapper">
            <label >{labelText}<span style={{color: 'red'}}> *</span></label>
            <input onChange={inputChangeEvent} className="profile-input" value={value}/>
        </div>
    );
}