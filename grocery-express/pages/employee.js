import Link from "next/link";
import Navbar from "./../components/Navbar";


function Employee () {
    const role = localStorage.getItem('role')

    //if (role == 1) {
    return (
        <div>
            <Navbar/>
                <div>
                <div class="col-span-2 ...">
                    <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">Menu</h1>
                </div>
                <div className="container mx-auto my-8">
            <div class="grid grid-rows-4 grid-flow-col gap-4">
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="makeStore"> Make Store</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="makePilot"> Make Pilot</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="makedrone"> Make Drone</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="makeItem"> Sell Item</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="store"> Display Stores</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="order_employee"> Display Orders</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="customer"> Display Customers</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="item"> Display Items</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="displaydrones"> Display Drones</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="pilot"> Display Pilots</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="flydrone"> Fly Drone</Link></button>
                </div>
                <div className="container mx-auto my-2">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold" type="submit"><Link href="angryBird"> Angry Bird</Link></button>
                </div>
                
            </div>
            </div>
        </div>
        </div>
        
    

    )    
    // );} else if (role==0) {return (
    //     <>
    //     <div className="container mx-auto my-8">
    //       <div className="flex shadow border-b">
    //         <ul>
    //           <li>
    //             You do not have the priviledge to view this page
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </>
    // )}
}

export default Employee;






