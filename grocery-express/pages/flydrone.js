
import Navbar from "./../components/Navbar";
import Router from "next/router";
function FlyDronePage() {

    const cred = localStorage.getItem('token');

    async function submitFormHandler(event) {
        event.preventDefault();

        const enteredStoreName = event.target.account.value;
        const enteredDroneIdentifier = event.target.firstName.value;
        const enteredAccount = event.target.lastName.value;
        

        const res= await fetch ('http://localhost:9090/drone/assign?storeName='+enteredStoreName+'&droneIdentifier='+enteredDroneIdentifier+'&account='+enteredAccount,{
            method :'POST',
            //body: JSON.stringify(reqBody),
            headers: {
                'token':cred, 
                //'Accept': 'application/json',
                //'Content-Type': 'application/json',
            },

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
  
          <label htmlFor="name">Account</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Account"type="text" id="lastName" name="lastName" required />
  
  
          <div className="container mx-auto my-8">
          <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit">Submit</button>
          </div>
          
        </form>
            </div>
            
            
        </div>
                
    ) 
    
  

}


export default FlyDronePage;



