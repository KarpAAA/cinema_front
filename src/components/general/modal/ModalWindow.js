export const ModalWindow = ({closeModalWindow, children}) => {

    return (

        <div
            style={{
                borderRadius: '20px',
                backgroundColor: '#333',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2% 20px',
                zIndex: '2',
                position: 'absolute',
                top: '20%',
                left: '30%',
                minHeight: '30%',
                minWidth: "40%",
            }}
        >
            {children}
            <button

                style={{
                    marginBottom: '10px',
                    width: '300px',
                    padding: '10px',
                    borderRadius: '15px',
                    border: '1px solid white',
                    backgroundColor: '#333',
                    color: '#fff',
                }}


                onClick={() => closeModalWindow()}>Close</button>
        </div>
    );
}
