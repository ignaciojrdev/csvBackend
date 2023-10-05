import express from 'express'
import multer from 'multer'
import { saveCsv, getUsers } from '../controller/users.js'

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

export const app = express();
app.use(express.json());

//uploading a csv file in memory using a multer middleware
app.post('/api/files', upload.single('file'), saveCsv);

app.get('/api/users', getUsers);