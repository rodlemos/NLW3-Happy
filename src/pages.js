const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');
module.exports ={

    index(req, res){
        return res.render('index')
    },

    async orphanage(req,res){
        const id = req.query.id;

        try {
            const db = await Database
            const results = await db.all(`SELECT * FROM orphanages WHERE id ="${id}"`);
            const orphanage = results[0]
            
            orphanage.images = orphanage.images.split(",");
            orphanage.firstImage = orphanage.images[0];
            if(orphanage.weekend_open == 0){
                orphanage.weekend_open = false;
            }else{
                orphanage.weekend_open = true;
            }
            return res.render('orphanage', {orphanage})
        } catch (error) {
            return res.send('Não foi possível conectar ao banco de dados')
        }        
    },

    async orphanages(req,res){
        try {
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages");
            return res.render('orphanages', {orphanages})
        } catch (error) {
            return res.send('Não foi possível conectar ao banco de dados')
        }
        
    },

    createOrphanage(req,res){
        return res.render('create-orphanage')
    },

    async saveOrphanage(req,res){
        const fields = req.body

        //validade if all fields are filled
        if(Object.values(fields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }

        try{
            const db = await Database
            await saveOrphanage(db, {
            lat: fields.lat,
            lng: fields.lng,
            name: fields.name,
            about: fields.about,
            whatsapp: fields.whatsapp,
            images: fields.images.toString(),
            instructions: fields.instructions,
            hour: fields.hour,
            weekend_open: fields.weekend_open
            })
    
            return res.redirect('/orphanages')
        } catch(error){
            return res.send("erro no banco de dados")
        }
    }
}