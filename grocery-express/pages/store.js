import Navbar from "./../components/Navbar";
import Link from "next/link";
import { useRef, useState } from 'react';

function Store () {

    const cred = localStorage.getItem('token');

    const [feedbackItems, setFeedbackItems] = useState([]);

    async function submitFormHandler(event) {
        event.preventDefault();



        fetch('http://localhost:9090/store/display',{
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
        <div>
            <Navbar />
            <div class="grid grid-cols-3 gap-4 my-8">
                <div class="col-span-2 ...">
                    <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">All Stores</h1>
                </div>
                <div class="...">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold  absolute right-20" ><Link href='/makeStore'>Add Store</Link></button>
                    <form onSubmit={submitFormHandler}>
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold  absolute right-20" >Click Here to Display Stores</button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto my-8">
                <div className="flex shadow border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr key={0}>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Store Id</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Store Name</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Store Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                feedbackItems.map((row) => (
                                        <tr key={row.storeId}>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{row.storeId}</div>
                                        </td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{row.storeName}</div>
                                        </td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.revenue}</div></td>
                                        </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        
    )
}

export default Store;

// export async function getServerSideProps(context){
//     // const res1 = await fetch(`http://localhost:9090/user/login`,{
//     //         method :'POST',
//     //         headers: {
//     //             'Accept': 'application/json',
//     //             'Content-Type': 'application/json'
//     //           },
//     //         body: JSON.stringify({"username": "admin","password": "admin","role": "1"})
//     //     })
//     //     const json1 = await res1.json()

//     //     const cred=json1.data.token
//     const cred = localStorage.getItem('token')

//     const res = await fetch(`http://localhost:9090/store/display`,{
//         headers:{
//             'token':cred
//         }
//     }).then(
//         (data) => data.json()
//     );
//     return{
//         props:{data: res.data},
//     };
// }     