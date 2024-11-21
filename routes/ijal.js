const express = require('express');
const router = express.Router();

let pengunjung = [{
    id: 1, nama: "Ijal", noTelepon: "+62082150285354" 
    },
    {
        id: 2, nama: "Syafrizal", noTelepon: "+62083156408078"   
    },
    
];
router.get('/', (req, res) => {res.json(pengunjung)});

router.post('/', (req, res) => {
    const newIjal
     = {
        id: pengunjung.length + 1, 
        nama: req.body.nama, 
        noTelepon:noTelepon
    };
    pengunjung.push(newIjal);
    res.status(201).json(newIjal);

});
router.delete('/:id',(req, res) => {
    const ijalIndex = pengunjung.findIndex(t=> t.id === parseInt(req.params.id));
    if(ijalIndex===-1)return res.status(404).json({Message: 'Data tidak ditemukan'});

    const deletedijal = pengunjung.splice(ijalIndex,1)[0];
    res.status(200).json({Message: `Data' ${deletedijal.nama.noTelepon}'telah dihapus`});
})
router.put('/:id',(req, res) => {
    const ijal = pengunjung.find(t=> t.id === parseInt(req.params.id));
    if(!ijal)return res.status(404).json({Message: 'Data tidak ditemukan'});
    ijal.nama.noTelepon = req.body.nama.noTelepon || ijal.nama.noTelepon

    res.status(200).json({
        Message: `Data' dengan ID ${ijal.id}'telah diperbarui`,
        updatedIjal:ijal
    });
})

module.exports =router;