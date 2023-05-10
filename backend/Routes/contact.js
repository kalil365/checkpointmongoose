const express = require('express');
const Contact = require('../Models/Contact');

const router = express.Router();


/* router.get('/test', (req, res) => {
    res.send('test 1')
}) */

// add new contact , post , need a formular from req.body 

router.post("/addContact", async (req, res) => {
    const { name, email, age } = req.body
    try {
        const find = await Contact.findOne({ email })

        if (find) {
            return res.status(400).send(' email allready exists')
        }
        const contact = new Contact({ name, email, age });
        await contact.save()
        res.status(201).send({ msg: 'contact created', contact })
    } catch (error) {
        res.status(500).send('server error')
    }
})

// get all contacts with get method

router.get('/getContacts', async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.status(200).send({ msg: 'all contacts', contacts })
    } catch (error) {
        res.status(500).send('server error')
    }

})

//delete contact methode delete , use get paramas

router.delete('/deleteContact/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Contact.findByIdAndDelete(id);
        res.status(200).send('contact deleted')
    } catch (error) {
        res.status(500).send('server error')
    }
})
//update contact  use methode put need req.params and req.body 

router.put('/updateContact/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contactUpdate = await Contact.findByIdAndUpdate(
            id ,
            {
                $set : {...req.body}
            },
            { new :true }
        )
        res.status(200).send('contact updated' , contactUpdate)

    } catch (error) {
        res.status(500).send('server error')
    }
})
module.exports = router; 