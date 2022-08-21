import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const storeOrder = ({data}) => {
    const router = useRouter();
    const { storeName } = router.query;
    //console.log(router.query)
    const type = router.query.type;

    if (type == 1) {
    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-3 gap-4 my-8">
                <div className="col-span-2 ...">
                    <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">{storeName}</h1>
                </div>
            </div>
            <div className="container mx-auto my-8">
                <div className="flex shadow border-b">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                        <tr key={0}>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Order Identifier</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Item Name</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Quantity</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Total Weight</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Total Cost</th>
                        </tr>
                        </thead>
                        <tbody>



                        {
                            data.map((row) => (
                                <tr>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.orderIdentifier}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.itemName}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.quantity}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.totalWeight}</div>
                                    </td>
                                    <td className="text-left px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{row.totalCost}</div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )} 
    else if (type == 2) { return (        <div>
        <Navbar />
        <div className="grid grid-cols-3 gap-4 my-8">
            <div className="col-span-2 ...">
                <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">{storeName}</h1>
            </div>
        </div>
        <div className="container mx-auto my-8">
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr key={0}>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Item ID</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Store ID</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Item Name</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Unit Weight</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Unit Price</th>
                    </tr>
                    </thead>
                    <tbody>



                    {//love
                        data.map((row) => (
                            <tr>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.itemId}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.storeId}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.itemName}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.unitWeight}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.unitPrice}</div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>)}
    else if (type == 3){ return (        <div>
        <Navbar />
        <div className="grid grid-cols-3 gap-4 my-8">
            <div className="col-span-2 ...">
                <h1 className="text-left font-medium text-3xl text-gray-500 uppercase tracking-wide py-3 px-6">{storeName}</h1>
            </div>
        </div>
        <div className="container mx-auto my-8">
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr key={0}>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Store ID</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Drone ID</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Max Trip</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Drone Identifier</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Remaining Capacity</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Num of Orders</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Flown By</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Max Capacity</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Drone Status</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Remaining Trip</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Pilot ID</th>
                    </tr>
                    </thead>
                    <tbody>



                    {
                        data.map((row) => (
                            <tr>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.store_id}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.drone_id}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.max_trip}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.drone_identifier}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.remaining_capacity}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.num_of_orders}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.flown_by}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.max_capacity}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.drone_status}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.remaining_trip}</div>
                                </td>
                                <td className="text-left px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{row.pilot_id}</div>
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>)}
};

export default storeOrder;

export async function getServerSideProps(context){
    const {storeName} = context.query;
    
    // const res1 = await fetch(`http://localhost:9090/user/login`,{
    //     method :'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({"username": "admin","password": "admin","role": "1"})
    // })
    // const json1 = await res1.json()

    // const cred=json1.data.token

    const cred = context.query.token;

    const type = context.query.type;

    if (type==1) {

    const res = await fetch(`http://localhost:9090/${storeName}/order`,{
        headers:{
            'token':cred
        }
    }).then(
        (data) => data.json()
    );
    return {
        props:{data:res.data},
    };
    }    

    else if (type==2) {
        const res = await fetch(`http://localhost:9090/store/${storeName}`,{
            headers:{
                'token':cred
            }
            }).then(
            (data) => data.json()
            );
        return {
                props:{data:res.data},
            };
    
    }

    

    else if (type == 3){    
        const res = await fetch(`http://localhost:9090/${storeName}/drone`,{
            headers:{
                'token':cred
            }
        }).then(
            (data) => data.json()
        );
        
        console.log(res)
        return {
            props:{data:res.data},
        };

}


}
