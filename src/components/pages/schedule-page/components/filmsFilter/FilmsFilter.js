import {useDispatch, useSelector} from "react-redux";
import {moviesFilterActions} from "../../../../../store/slices/movies-filter-slice";


export const FilmsFilter = () => {
    const periodOptions = ["Today", "Tomorrow", "Week", "Month"];
    const dispatch = useDispatch();
    const {selectedOption, technologyOptions, ageOptions, title } = useSelector(state => state.moviesFilter);

    const handleOptionChange = (e) => {
        dispatch(moviesFilterActions.changeSelectedOption(e.target.value));
    };
    const handleTechnologyCheckboxChange = (e) => {
         const { name, checked } = e.target;
         const params = {
             name,
             checked
         }
        dispatch(moviesFilterActions.changeSelectedTechnologies(params));
    };
    const handleAgeOptionsChange = (e) => {
        const { name, checked } = e.target;
        const params = {
            name,
            checked
        }

        dispatch(moviesFilterActions.changeSelectedAges(params));
    };

    const handleTitleOptionsChange = (e) => {
        const title = e.target.value;
        dispatch(moviesFilterActions.changeSelectedTitle(title));
    };

    return (
        <div>
            <div>
                <input
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '8px 5px',
                        fontSize: '16px',
                        border: '1px solid #782624',
                        borderRadius: '5px'
                    }}
                    placeholder="Movie title..."
                    value={title}
                    onChange={handleTitleOptionsChange}/>
            </div>
            <div className={'dayRadios'}>
                <h2 style={{fontSize: '18px'}}>Period</h2>
                {periodOptions.map((item, index) => (
                    <div key={index}>
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
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                name={key}
                                checked={technologyOptions[key]}
                                onChange={handleTechnologyCheckboxChange}
                            />
                            {key}
                        </label>
                    </div>
                ))}
            </div>


            <div className={'technologyOptions'}>
                <h2 style={{fontSize: '18px'}}>Age</h2>
                {Object.keys(ageOptions).map((key, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="checkbox"
                                name={key}
                                checked={ageOptions[key]}
                                onChange={handleAgeOptionsChange}
                            />
                            {key}+
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}