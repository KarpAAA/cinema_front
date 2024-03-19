import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fas} from "@fortawesome/free-solid-svg-icons";
import * as fal from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
    return (
        <footer className={'footer'}>
            <div>
                <div className={'footer-title'}>
                    ff(Film fusion)
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <FontAwesomeIcon className={'footer-icon'} icon={fal.faFacebook}/>
                    <FontAwesomeIcon className={'footer-icon'} icon={fal.faInstagram}/>
                    <FontAwesomeIcon className={'footer-icon'} icon={fal.faTwitter}/>
                    <FontAwesomeIcon className={'footer-icon'} icon={fal.faLinkedin}/>
                </div>
            </div>
            <div>
                <div className={'footer-title'}>Working</div>
                <div className={'info'}>Mon-Fr 9:30-21:00</div>
                <div className={'info'}>Sat-Sun 9:30-23:00</div>
            </div>
            <div>
                <div className={'footer-title'}>Address</div>
                <div className={'info'}>Shevchenko Avenue</div>
                <div className={'info'}>Lviv 79000</div>
            </div>
            <div>
                <div className={'footer-title'}>Contacts</div>
                <div className={'info'}>
                    <FontAwesomeIcon className={'footer-icon'} icon={fas.faEnvelope} style={{fontSize: '15px'}}/>
                    <span>   Filmfusion@gmail.com</span>

                </div>

                <div className={'info'}>
                    <FontAwesomeIcon className={'footer-icon'} icon={fas.faPhone} style={{fontSize: '15px'}}/>
                    <span>  (270) 555-0117</span>
                </div>
            </div>
        </footer>
    );

}