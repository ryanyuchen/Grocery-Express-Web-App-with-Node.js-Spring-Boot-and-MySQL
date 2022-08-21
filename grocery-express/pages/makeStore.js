import Navbar from "./../components/Navbar";
import Router from "next/router";
export default function MakeStore() {
    const cred = localStorage.getItem('token');
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      const data = {
        storeName: event.target.name.value,
        revenue: event.target.revenue.valueAsNumber,
      }

      const JSONdata = JSON.stringify(data)
  
      const endpoint = `http://localhost:9090/store/add`

  
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
      const data1 = {}
      const response = await (await fetch(`http://localhost:9090/store/add`, options)).json()

      if(response.code == 200){
        //Router.push({pathname:'/store'})
        alert(response.msg)
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
                <label htmlFor="name">Store Name</label>
                <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Store Name" type="text" id="name" name="name" required />

                <label htmlFor="revenue">Revenue</label>
                 <input className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Revenue" type="number" id="revenue" name="revenue" required />
                <div className="container mx-auto my-8">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit">Submit</button>
                </div>
               
            </form>
          </div>
          
      </div>
      
    )
  }
