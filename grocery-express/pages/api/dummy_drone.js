import fs from 'fs';
import path from 'path';


function buildFeedbackPath() {
    return path.join(process.cwd(),'local_test_data','dummy_drone_empty.json');
}

function extracFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    //console.log(path.join(process.cwd(),'local_test_data','feedback.json'));

    const data = JSON.parse(fileData);
    //console.log(data)
    return data;
}


function handler(req, res) {
    if (req.method === 'POST') {
        //const functionName = req.body.function;
        const droneName = req.body.dronename;
        const totalCap = req.body.totalcap;
        const numOrders = req.body.numorders;
        const remainingCap = req.body.remainingcap;
        const tripsLeft = req.body.tripsleft;
        
        const newDrone = {
            drone: droneName,
            tcap: totalCap,
            order: numOrders,
            rcap: remainingCap,
            trip: tripsLeft,
        };

        const filePath = buildFeedbackPath();
        //const filePathRead = path.join(process.cwd(),'local_test_data','dummy_drone.json')
        const data = extracFeedback(filePath);
        //const dataRead = extracFeedback(filePathRead);
        //console.log(data);
        //console.log(droneName) ; 
        data.push(newDrone);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: 'Success!', feedback: newDrone});
    } else{

        const filePath = buildFeedbackPath();
        const filePathRead = path.join(process.cwd(),'local_test_data','dummy_drone_empty.json')
        const dataRead = extracFeedback(filePathRead);

        const data = extracFeedback(filePath);
        //console.log(data)
        console.log(dataRead)

        res.status(200).json({ store: dataRead.drones});

    }
    
  }
  

export default handler;