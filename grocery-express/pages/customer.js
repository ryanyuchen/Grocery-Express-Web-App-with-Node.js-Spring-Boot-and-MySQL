import Navbar from "./../components/Navbar";
import { useRef, useState } from 'react';


function CustomerPage() {
    const cred = localStorage.getItem('token');

    const [feedbackItems, setFeedbackItems] = useState([]);
    

    async function submitFormHandler(event) {
        event.preventDefault();



        fetch('http://localhost:9090/customer/display',{
            method :'GET',
            //body: JSON.stringify(reqBody),
            headers: {
                'token':cred, 
                'Accept': 'application/json',
                'Content-Type': 'application/json',},
        })         
        .then((response) => response.json())
        .then((data) => {
          setFeedbackItems(data.data)  
        })   


    }


    return (

//         <div>
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
            <Navbar />
            <div>

        <hr />

            <div class="grid grid-cols-3 gap-4 my-8">
                <div class="col-span-2 ...">
                    <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">All Customers</h1>
                </div>
                {/* <div class="...">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold  absolute right-20" ><Link href='/makeStore'>Add Store</Link></button>
                </div> */}
                <div class="...">
                    <form onSubmit={submitFormHandler}>
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold  absolute right-20" >Click Here to Display Customers</button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto my-8">
                <div className="flex shadow border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr key={0}>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">First Name</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Last Name</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Phone Number</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Credit</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Rating</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Pending Order Cost</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                feedbackItems.map((row) => (
                                        <tr>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{row.firstName}</div>
                                        </td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{row.lastName}</div>
                                        </td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.phoneNumber}</div></td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.credit}</div></td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.rating}</div></td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.pendingOrderCost}</div></td>
                                        </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            </div>
        
    )
}


export default CustomerPage;



// const CustomerPage = ({data}) =>{
//     //localStorage.getItem('token')
    
//     return (
//         <div>
//             <Navbar />
//             <div class="grid grid-cols-3 gap-4 my-8">
//                 <div class="col-span-2 ...">
//                     <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">All Customers</h1>
//                 </div>
//                 {/* <div class="...">
//                     <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold  absolute right-20" ><Link href='/makeStore'>Add Store</Link></button>
//                 </div> */}
//             </div>
//             <div className="container mx-auto my-8">
//                 <div className="flex shadow border-b">
//                     <table className="min-w-full">
//                         <thead className="bg-gray-50">
//                             <tr key={0}>
//                                 <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">First Name</th>
//                                 <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Last Name</th>
//                                 <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Phone Number</th>
//                                 <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Credit</th>
//                                 <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Rating</th>
//                                 <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Pending Order Cost</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 data.map((row) => (
//                                         <tr>
//                                         <td className="text-left px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-500">{row.firstName}</div>
//                                         </td>
//                                         <td className="text-left px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-500">{row.lastName}</div>
//                                         </td>
//                                         <td className="text-left px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-500">{row.phoneNumber}</div></td>
//                                         <td className="text-left px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-500">{row.credit}</div></td>
//                                         <td className="text-left px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-500">{row.rating}</div></td>
//                                         <td className="text-left px-6 py-4 whitespace-nowrap">
//                                         <div className="text-sm text-gray-500">{row.pendingOrderCost}</div></td>
//                                         </tr>
//                                 ))
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             </div>
        
//     )
// }

// export default CustomerPage;




// export async function getStaticProps(context) {
//     const cred=localStorage.getItem("token")
//     const res = await fetch('http://localhost:9090/user/login', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ "username": "admin", "password": "admin", "role": "1" })
//     })
//     const json = await res.json()

//     //const cred = localStorage.getItem('token')
//     const res1 = await fetch('http://localhost:9090/customer/display', {
//         method: 'GET',
        
//         headers: {
//             //'token': json.data.token,
//             'token': cred,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         //body: JSON.stringify({"storeName": "caoni","revenue": "100"})
//     })
//     const json1 = await res1.json()



//     if (!json) {
//         return {
//             notFound: true,
//         }
//     }

//     const data = json1.data

//     return { props: { data } };
// }

