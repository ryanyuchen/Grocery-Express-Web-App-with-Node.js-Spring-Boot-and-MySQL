import Navbar from "./../components/Navbar";
import Link from "next/link";

const Drone = ({data}) =>{
    //const router = useRouter();
    return (
        <div>
            <Navbar />
            <div class="grid grid-cols-3 gap-4 my-8">
                <div class="col-span-2 ...">
                    <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">All Drones</h1>
                </div>
                <div class="...">
                    <button className="rounded bg-blue-600 text-white px-6 py-2 font-semibold  absolute right-20" ><Link href='/makedrone'>Add Drone</Link></button>
                </div>
            </div>
            <div className="container mx-auto my-8">
                <div className="flex shadow border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr key={0}>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Store Name</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Drone ID</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Max Capacity</th>
                                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Max Trip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row) => (
                                        <tr key={row.storeId}>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{row.storeName}</div>
                                        </td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{row.droneIdentifier}</div>
                                        </td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.maxCapacity}</div></td>
                                        <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.maxTrip}</div></td>
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

export default Drone;

export async function getServerSideProps(context){
    const res1 = await fetch(`http://localhost:9090/user/login`,{
            method :'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"username": "admin","password": "admin","role": "1"})
        })
        const json1 = await res1.json()

        const cred=json1.data.token

    const res = await fetch(`http://localhost:9090/store/display`,{
        headers:{
            'token':cred
        }
    }).then(
        (data) => data.json()
    );
    return{
        props:{data: res.data},
    };
}     