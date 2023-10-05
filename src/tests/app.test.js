import { app } from '../config/server.js';
import  request from 'supertest';

describe("POST /api/files", ()=>{

    it('should return csv in body', async () =>{
        const res = await request(app)
            .post('/api/files')
            .attach('file', `${__dirname}/csvNumberscsv.csv`)
            
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('Content-Length', '17')
    })

    it('must return if any file was sent', async () => {
        const res = await request(app).post('/api/files')
    
        expect(400)
        expect(res.body).toBe("You did not insert file parameter. It is required.");
      });

    it('must return an error if was sent a wrong file', async () => {
        const res = await request(app).post('/api/files')
        .attach('file', `${__dirname}/test.txt`)

        expect(400)
        expect(res.body).toBe("Please, send only .csv file.");
      });
});

describe("GET /api/users", ()=>{

    it('should return filter data by query params (Name: John)', async () =>{
        const res = await request(app)
        .get('/api/users')
        .query({Name: 'John'})
        expect(200)
        expect(res.body).toEqual([
            {
                "Name": "john doe",
                "City": "new york",
                "Country": "usa",
                "Favorite_sport": "basketball"
            },
            {
                "Name": "mike johnson",
                "City": "paris",
                "Country": "france",
                "Favorite_sport": "tennis"
            }
        ]);
        
            
    })

    it('should return filter data by query params (City: New)', async () =>{
        const res = await request(app)
        .get('/api/users')
        .query({City: 'New'})
        expect(200)
        expect(res.body).toEqual([
            {
                "Name": "john doe",
                "City": "new york",
                "Country": "usa",
                "Favorite_sport": "basketball"
            }
        ]);  
    })

    it('should return filter data by query params (Country: Australia)', async () =>{
        const res = await request(app)
        .get('/api/users')
        .query({Country: 'Australia'})
        expect(200)
        expect(res.body).toEqual([
            {
                "Name": "tom brown",
                "City": "sydney",
                "Country": "australia",
                "Favorite_sport": "running"
            }
        ]);  
    })

    it('should return filter data by query params (Favorite_sport: Bask)', async () =>{
        const res = await request(app)
        .get('/api/users')
        .query({Favorite_sportName: 'Bask'})
        expect(200)
        expect(res.body).toEqual([
            {
                "Name": "john doe",
                "City": "new york",
                "Country": "usa",
                "Favorite_sport": "basketball"
            },
            {
                "Name": "emma wilson",
                "City": "berlin",
                "Country": "germany",
                "Favorite_sport": "basketball"
            }
        ]);  
    })

    it('should return filter data by query params (Favorite_sport: Swimming and Name: EMMA WILSON)', async () =>{
        const res = await request(app)
        .get('/api/users')
        .query({Name: 'EMMA WILSON', Favorite_sport: "Swimming"})
        expect(200)
        expect(res.body).toEqual([
            {
                "Name": "emma wilson",
                "City": "berlin",
                "Country": "germany",
                "Favorite_sport": "basketball"
            },
            {
                "Name": "karen lee",
                "City": "tokyo",
                "Country": "japan",
                "Favorite_sport": "swimming"
            }
        ]);  
    })


    it('should return an error beacuse the request dont have query params', async () => {
        const postRes = 
        await request(app)
            .post('/api/files')
            .then(async function(){
                const getRes = await request(app)
                .get('/api/users')

                expect(400)
                expect(getRes.body).toBe("You did not insert query parameters. It is required.");
        
            });   
      });
});
