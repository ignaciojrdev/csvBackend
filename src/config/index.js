import { app } from './server.js'

const port_server = "3000";

app.listen(port_server, () =>{
    console.log(`Server on port ${port_server}`);
});
