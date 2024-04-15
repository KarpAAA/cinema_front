import "./PurchaseTicketPage.css"
import {Schedule} from "../schedule-page/components/schedule/Schedule";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cartActions, handlePurchase} from "../../../store/slices/user-cart-slice";
import {useParams} from "react-router-dom";
import {selectSessionById} from "../../../store/slices/session-slice";
import {selectMovieById} from "../../../store/slices/movie-slice";
import {Film} from "./Film";
import {useGetSessionByIdQuery, usePurchaseTicketMutation} from "../../../store/api";


export const PurchaseTicketPage = () => {
    const {id} = useParams();
    const dispatcher = useDispatch();

    const {selectedSeats} = useSelector(state => state.cart);
    const {goods} = useSelector(state => state.goods);
    const {user} = useSelector(state => state.user);


    const {data: session} = useGetSessionByIdQuery(id);
    const {goodToAmount} = useSelector(state => state.cart);
    const [purchaseTicket, {isLoading, isError, isSuccess}] = usePurchaseTicketMutation();

    useEffect(() => {
        dispatcher(cartActions.useCart(goods));
        return () => {
            dispatcher(cartActions.clearCart());
        }
    }, [goods]);


    useEffect(() => {
        if(isSuccess){
            dispatcher(cartActions.clearCart());
            dispatcher(cartActions.useCart(goods));
        }
    }, [isSuccess]);

    const handleChange = (elementId, amount) => () => {
        dispatcher(cartActions.addGoodToCard({elementId, amount}));
    }

    const handlePurchaseClick = () => {
        const selectedGoods =
            Object
                .entries(goodToAmount)
                .filter(([id, amount]) => amount !== 0)
                .map(([id, amount]) => ({id: parseInt(id), amount}));

        const purchaseInfo = {
            userId: user.id,
            sessionId: session.id,
            price: calculateGeneralPrice(),
            selectedSeats: selectedSeats,
            selectedGoods: selectedGoods
        };
        console.log(purchaseInfo);
        purchaseTicket({body: purchaseInfo, id: session.id});
    }
    const calculateGeneralPrice = () => {
        let price = 0;
        selectedSeats.forEach(s => price += s.price);
        goods.forEach(g => price += goodToAmount[g.id] * g.price);

        return price;
    }

    return (
        <div>
            {
                session &&
                <div className={'purchase-ticket-page-content'}>
                    <div className={'purchase-ticket-column1'}>
                        <div style={{color: 'white', fontSize: '30px', marginBottom: '30px'}}>
                            Hall {session.hall.id}
                        </div>
                        <div className={'hall-menu-container'}>
                            <Schedule
                                hall={session.hall}
                                ticketTypes={session.ticketTypes}
                                style={{'backgroundColor': 'black', width: "60%"}}
                                allowChoose={true}
                            >
                            </Schedule>
                        </div>

                        <div style={{color: 'white', fontSize: '30px', marginBottom: '30px'}}>Bar</div>
                        <div className={'purchase-bar-container'}>
                            {goods.map((element, index) => (
                                <div className={'purchase-bar-item'} key={element.id}>
                                    <div>
                                        <img src={element.photo}/>
                                    </div>
                                    <div>
                                        {element.name}
                                    </div>
                                    <div style={{marginTop: "50px", color: 'white', fontWeight: "bold"}}>
                                        {element.price} UAH
                                    </div>

                                    <div className="number-input">
                                        <button onClick={handleChange(element.id, -1)}>-</button>
                                        <span style={{padding: '0 10px'}}>{goodToAmount[element.id]}</span>
                                        <button onClick={handleChange(element.id, 1)}>+</button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={'purchase-ticket-column2'}
                         style={{display: 'flex', flexDirection: 'column'}}>
                        <Film session={session}></Film>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: "center",
                            fontSize: '18px',
                            width: '80%',
                            padding: '0 20px',
                            marginBottom: '10px'
                        }}>
                            <div>
                                Price: <span
                                style={{fontWeight: 'bold', marginLeft: '10px'}}> {calculateGeneralPrice()} UAH</span>
                            </div>
                            <div>
                                <button
                                    onClick={handlePurchaseClick}
                                    style={{
                                        padding: '10px 15px',
                                        backgroundColor: '#282727',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '10px',
                                        fontSize: '17px'
                                    }}>
                                    Purchase
                                </button>
                            </div>
                        </div>
                        <div>
                            {selectedSeats.map((s, index) => (
                                <div key={index} className={'cart-item'}>
                                    <div style={{display: "flex", flexDirection: 'row'}}>
                                        <div style={{marginRight: '20px'}}>
                                            <div>{s.row}</div>
                                            <div>row</div>
                                        </div>
                                        <div>
                                            <div>{s.seat}</div>
                                            <div>seat</div>
                                        </div>
                                    </div>
                                    <div style={{fontWeight: 'bold'}}>{s.price} UAH</div>
                                </div>
                            ))}

                            {goods.map((g, index) => (
                                goodToAmount[g.id] > 0 &&
                                <div key={index} className={'cart-item'}>
                                    <div>
                                        {g.name} x {goodToAmount[g.id]}
                                    </div>
                                    <div style={{fontWeight: 'bold'}}> {g.price * goodToAmount[g.id]} UAH</div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>
            }
        </div>

    );
}