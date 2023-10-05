import csvtojson from 'csvtojson'
export var usersList = [];

export async function saveCsv(request, response) {
    const { file } = request;
    if(!file){
        return response.status(400).json("You did not insert file parameter. It is required.");
    }

    let splitedOriginalName = file.originalname.split('.');
    if(splitedOriginalName[1] != 'csv'){
        return response.status(400).json("Please, send only .csv file.");
    }

    try{
        const file64 = Buffer.from(file.buffer).toString('utf-8'); 
        const users = await csvtojson().fromString(file64);
        usersList = users;
        return response.status(200).json("Csv was loaded.");
    }catch{
        return response.status(500).json("The server can't process csv.");
    }
    
}

export async function getUsers (request, response) {
    if(usersList.length == 0){
        return response.status(400).json("Please, first load csv file with post RestFul.");
    }

    const { query } = request;
    let keysQuery = Object.keys(query);

    if(keysQuery.length == 0){
        return response.status(400).json("You did not insert query parameters. It is required.");
    }
    
    let usersListToReturn = [];
    let usersListKeys = Object.keys(usersList[0]);

    keysQuery.forEach(key => {

        let paramQuery = query[key].toLowerCase();
        
        usersList.forEach( element => {
            
            usersListKeys.forEach( elKey => {
                element[elKey] = element[elKey].toLowerCase();
                let splited = element[elKey].split(paramQuery);
                let contains = usersListToReturn.indexOf(element);
                
                if((splited.length > 1) && (contains == -1)){
                    usersListToReturn.push(element);
                }
            });
        })
        
    });

    return response.status(200).json(usersListToReturn);
}
