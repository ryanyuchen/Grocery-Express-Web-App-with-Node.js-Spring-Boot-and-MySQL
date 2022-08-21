import Navbar from "./../components/Navbar";
import Router from "next/router";
export default function MakePilot() {
    const cred = localStorage.getItem('token');
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      const data = {
        account: event.target.account.value,
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        phoneNumber: event.target.phoneNumber.value,
        taxId: event.target.taxId.value,
        licenseId: event.target.licenseId.value,
        experience: event.target.experience.valueAsNumber,
      }

      const JSONdata = JSON.stringify(data)
  
      const endpoint = `http://localhost:9090/pilot/add`

  
      // const res1 = await fetch(`http://localhost:9090/user/login`,{
      //       method :'POST',
      //       headers: {
      //           'Accept': 'application/json',
      //           'Content-Type': 'application/json'
      //         },
      //       body: JSON.stringify({"username": "admin","password": "admin","role": "1"})
      //   })
      //   const json1 = await res1.json()

      //   const cred=json1.data.token

      const options = {
        
        method: 'POST',
        
        headers: {
            'token':cred,
            'Content-Type': 'application/json'
        },
        body: JSONdata,
      }
      const response = await (await fetch(endpoint, options)).json()
      if(response.code == 200){
        Router.push({pathname:'/pilot'})
      }
      else{
        alert(response.msg)
      }
      
      
    }
    return (
      <div>
          <Navbar/>
          <div className="container mx-auto my-8">
          <form onSubmit={handleSubmit}>
        <label htmlFor="name">Account</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Account"type="text" id="account" name="Account" required />

        <label htmlFor="name">First Name</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="First Name"type="text" id="firstName" name="firstName" required />

        <label htmlFor="name">Last Name</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Last Name"type="text" id="lastName" name="lastName" required />

        <label htmlFor="name">Phone Number</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Phone Number"type="text" id="phoneNumber" name="phoneNumber" required />

        <label htmlFor="name">Tax Id</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Tax Id"type="text" id="taxId" name="taxId" required />

        <label htmlFor="name">License Id</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="License Id"type="text" id="licenseId" name="licenseId" required />

        <label htmlFor="revenue">Experience</label>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Experience"type="number" id="experience" name="experience" required />
        <div className="container mx-auto my-8">
        <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit">Submit</button>
        </div>
        
      </form>
          </div>
          
          
      </div>
      
    )
  }
