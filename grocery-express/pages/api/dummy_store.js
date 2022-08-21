import fs from 'fs';
import path from 'path';


function buildFeedbackPath() {
    return path.join(process.cwd(),'local_test_data','dummy_store.json');
}

function extracFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    //console.log(path.join(process.cwd(),'local_test_data','feedback.json'));

    const data = JSON.parse(fileData);
    console.log(data)
    return data;
}


function handler(req, res) {
    if (req.method === 'POST') {
        //const functionName = req.body.function;
        const storeName = req.body.store;
        const newStore = {
            store: storeName,
        };

        const filePath = buildFeedbackPath();
        //const filePathRead = path.join(process.cwd(),'local_test_data','dummy_drone.json')
        const data = extracFeedback(filePath);
        //const dataRead = extracFeedback(filePathRead);
        //console.log(data);  
        data.push(newStore);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: 'Success!', feedback: newStore});
    } else{

        const filePath = buildFeedbackPath();
        const filePathRead = path.join(process.cwd(),'local_test_data','dummy_drone.json')
        const dataRead = extracFeedback(filePathRead);

        const data = extracFeedback(filePath);
        //console.log(data)
        console.log(dataRead)

        res.status(200).json({ store: dataRead.drones});

    }
    
  }
  

export default handler;