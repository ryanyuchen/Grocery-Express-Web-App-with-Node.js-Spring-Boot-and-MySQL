import { useRef, useState } from 'react';

function DroneButtonPage() {

    const [feedbackItems, setFeedbackItems] = useState([]);

    const droneInputRef = useRef();


    function submitFormHandler(event) {
        event.preventDefault();
        const enteredStore = droneInputRef.current.value;
        console.log(enteredStore);
        const reqBody = {store:enteredStore};
      
        //console.log(path.join(process.cwd(),'local_test_data','feedback.json'));
        fetch('/api/dummy_store', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json());
    }

    function loadFeedbackHandler () {
        fetch('/api/dummy_store')         
          .then((response) => response.json())
          .then((data) => {
            setFeedbackItems(data.store)  
          })       
          ;
          
    }

    return (
        <div>
            <h1>Input Store Name Here</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    
                    <textarea ref={droneInputRef}></textarea>
                </div>
            
                <button>Input Store</button>
            </form>
            <hr />
            <button onClick={loadFeedbackHandler}>Load Drones</button>
            <ul>
                {feedbackItems.map(item => (<li>{item.droneID},{item.total_cap},{item.num_orders},{item.remaining_cap},{item.trips_left}</li>))}
            </ul>
        </div>
    )//{feedbackItems.map(item => <li>{item.next}</li>)}
}


export default DroneButtonPage;