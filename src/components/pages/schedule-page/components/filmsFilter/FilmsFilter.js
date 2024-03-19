

export const FilmsFilter = ({technologyOptions, setTechnologyOptions, ageOptions, setAgeOptions,selectedOption, setSelectedOption}) => {
    const periodOptions = ["Today", "Tomorrow", "Week", "Month"];
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTechnologyOptions({
            ...technologyOptions,
            [name]: checked,
        });
    };
    const handleAgeOptionsChange = (e) => {
        const { name, checked } = e.target;
        setAgeOptions({
            ...ageOptions,
            [name]: checked,
        });
    };

    return (
        <div>
            <div className={'dayRadios'}>
                <h2 style={{fontSize: '18px'}}>Period</h2>
                {periodOptions.map((item, index) => (
                    <div>
                        <input
                            type="radio"
                            name="color"
                            value={item.toLowerCase()}
                            checked={selectedOption === item.toLowerCase()}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="red-radio">{item}</label>
                    </div>
                ))}
            </div>

            <div className={'technologyOptions'}>
                <h2 style={{fontSize: '18px'}}>Technology</h2>
                {Object.keys(technologyOptions).map((key, index) => (
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name={key}
                                checked={technologyOptions[key]}
                                onChange={handleCheckboxChange}
                            />
                            {key}
                        </label>
                    </div>
                ))}
            </div>


            <div className={'technologyOptions'}>
                <h2 style={{fontSize: '18px'}}>Age</h2>
                {Object.keys(ageOptions).map((key, index) => (
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name={key}
                                checked={ageOptions[key]}
                                onChange={handleAgeOptionsChange}
                            />
                            {key}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}