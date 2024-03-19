import './HomePage.css';
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const navigateToPage = (link) => () => {
        navigate(link);
    }

    return <div className={'content'}>

        <div className={'blocks-container'}>

            <div className={'block-column'} style={{width: '75%'}}>
                <div className={'title'}>
                    Here Movies Come To Life
                </div>
                <div className={'block premiere-block'}>
                    <div>
                        <div className={'rounded'} style={{backgroundColor: 'white', color: 'black'}}>Premier
                        </div>
                        <div className={'rounded'}>18.03.2024</div>
                    </div>


                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <button className="round-button">
                            ▶
                        </button>
                        <div style={{marginLeft: '10px'}}>
                            More about <br/> the event
                        </div>
                    </div>

                </div>
            </div>
            <div className={'block-column'} style={{width: '20%'}}>
                <div className={'block films-block'}>
                    <h2>Schedule</h2>
                    <h4>Filters</h4>
                    <div className={'filter-option'} style={{transform: 'rotate(-20deg)'}}>Period</div>
                    <div className={'filter-option'}>Technology</div>
                    <div className={'filter-option'}>Age</div>
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <button className="round-button" onClick={navigateToPage('/schedule')}>
                            ▶
                        </button>
                    </div>

                </div>

                <div className={'block schedule-block'}>
                    <h2 style={{alignSelf: 'start', justifySelf: 'start'}}>Films</h2>
                    <div style={{alignSelf: 'end', justifySelf: 'end'}}>
                        <button className="round-button" onClick={navigateToPage('/films')}>
                            ▶
                        </button>
                    </div>

                </div>

            </div>
        </div>

    </div>
}

export default HomePage;


