import { useRef } from 'react';
import Navbar from "./../components/Navbar";
import Router from "next/router";



function MakeDronePage() {

    const storeNameInputRef = useRef();
    const droneIdentifierInputRef = useRef();
    const maxCapacityInputRef = useRef();
    const maxTripInputRef = useRef();
    //console.log(props)
    
    const cred=localStorage.getItem('token')

    async function submitFormHandler(event) {
        event.preventDefault();

        const enteredStoreName = event.target.account.value;
        const enteredDroneIdentifier = event.target.firstName.value;
        const enteredMaxCapacity = event.target.lastName.value;
        const enteredMaxTrip = event.target.phoneNumber.value;

        const reqBody = {'storeName': enteredStoreName, 'droneIdentifier':enteredDroneIdentifier,'maxCapacity':enteredMaxCapacity,'maxTrip':enteredMaxTrip};
        
        

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


        

        const res= await fetch ('http://localhost:9090/drone/add',{
            method :'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'token':cred, 
                'Accept': 'application/json',
                'Content-Type': 'application/json',},

        });
        //.then((response) => response.json()).then((data) => console.log(data));

        const result = await res.json()



        if(result.code == 200){
            
            //Router.push({pathname:'/drone'})
            alert(result.msg)
          }
          else{
            alert(result.msg)
          }
    }


    return (

        
            // <div>
            //     <h1>Make Drones Here</h1>

            
            // <form onSubmit={submitFormHandler}>
            // <label htmlFor="first">Store Name</label>
            // <input type="text" id="first" name="first" required ref={storeNameInputRef}/>

            // <label htmlFor="first">Drone ID</label>
            // <input type="text" id="second" name="second" required ref={droneIdentifierInputRef}/>

            // <label htmlFor="last">Max Capacity</label>
            // <input type="text" id="third" name="third" required ref={maxCapacityInputRef}/>

            // <label htmlFor="last">Max Trip</label>
            // <input type="text" id="last" name="last" required ref={maxTripInputRef}/>


            // <button>make drone</button>
            // </form> 
            
            // </div>
            



            <div>
            <Navbar/>
            <div className="container mx-auto my-8">
            <form onSubmit={submitFormHandler}>
          <label htmlFor="name">Store Name</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Store Name"type="text" id="account" name="Account" required />
  
          <label htmlFor="name">Drone ID</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Drone ID"type="text" id="firstName" name="firstName" required />
  
          <label htmlFor="name">Max Capacity</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Max Capacity"type="text" id="lastName" name="lastName" required />
  
          <label htmlFor="name">Max Trip</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Max Trip"type="text" id="phoneNumber" name="phoneNumber" required />
  

          <div className="container mx-auto my-8">
          <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit">Submit</button>
          </div>
          
        </form>
            </div>
            
            
        </div>
        
    )


}



export async function getServerSideProps(context) {

    //var a = document.getElementById("first").value


    const res1 = await fetch('http://localhost:9090/user/login',{
        method :'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"username": "admin","password": "admin","role": "1"})
    })
    const json1 = await res1.json()



    // const res = await fetch('http://localhost:9090/drone/add',{
    //     method :'POST',
    //     headers: {
    //         'token':json1.data.token, 
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'},
    //     body: JSON.stringify({"storeName": "Kroger",
    //     "droneIdentifier": "1",
    //     "maxCapacity": "100",
    //     "maxTrip": "3"
    // })

    // })
    // const json = await res.json()

    // if (!json) {
    //     return {
    //       notFound: true,
    //     }
    //   }
    // console.log(json)


    return { props: {json1} };
}


export default MakeDronePage;

