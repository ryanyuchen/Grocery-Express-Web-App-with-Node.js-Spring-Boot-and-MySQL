import Navbar from "./../components/Navbar";
import Router from "next/router";

function DisplayDronePage() {
    const cred = localStorage.getItem('token');


    const submitFormHandler = async (event) => {
        event.preventDefault();

       
        //const enteredStoreName = storeNameInputRef.current.value;

        const data = {
            storeName : event.target.name.value
        }

    
        // const res1 = await fetch('http://localhost:9090/user/login',{
        //     method :'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       },
        //     body: JSON.stringify({"username": "admin","password": "admin","role": "1"})
        // })
        // const json1 = await res1.json()

        // const cred=json1.data.token



        const res = await fetch('http://localhost:9090/'+data.storeName+'/drone',{
            method :'GET',
            //body: JSON.stringify(reqBody),
            headers: {
                'token':cred, 
                'Accept': 'application/json',
                'Content-Type': 'application/json',},
        })

        const json =await res.json()

        
        if(json.code == 200 && json.data.length > 0){
            Router.push({pathname:data.storeName,query: { token: cred ,type:3}})
        }
        else if (json.code == 200) {
            alert('no drone')
        }
        else{
            alert(json.msg)

    }
}


    return (

    //     <div>
    //         <Navbar/>
    //         <h1>Input Store Name Here</h1>
    //         <form onSubmit={submitFormHandler}>
    //             <div>
                    
    //                 <textarea ref={storeNameInputRef}></textarea>
    //             </div>
            
    //             <button>Display Drones</button>
    //         </form>
    //         <hr />
            
    //         <ul>
    //          {feedbackItems.map((item) => (<li> Store ID: {item.store_id}, Drone ID: {item.drone_id}, Max Trip: {item.max_trip}, Drone Identifier: {item.drone_identifier}, Remaining Capacity: {item.remaining_capacity}, Num of Orders: {item.remaining_capacity}, 
    //  Max Capacity: {item.max_capacity}, Drone Status: {item.drone_status}, Remaining Trip: {item.remaining_trip}</li>))}
    //         </ul>
    //     </div>

    <div>
    <Navbar/>
    <div className="container mx-auto my-8">
        <form onSubmit={submitFormHandler}>
            <label htmlFor="name">Store Name</label>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                   placeholder="Store Name" type="text" id="name" name="name" required />

            <div className="container mx-auto my-8">
                <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit">Submit</button>
            </div>

        </form>

    </div>

</div>
    )
    

}



export default DisplayDronePage;




