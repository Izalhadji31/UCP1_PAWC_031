const express = require('express');
const router = express.Router();

let pengunjung = [{
    id: 1, task: "Belajar Node.js", completed: false
    },
    {
        id: 2, task: "Membuat API", completed: false    
    },
    {
        id: 3, task: "Ini adalah Data baru", completed: false    
    },
];
router.get('/', (req, res) => {res.json(pengunjung)});

router.post('/', (req, res) => {
    const newIjal
     = {
        id: pengunjung.length + 1, 
        task: req.body.task, 
        completed:false
    };
    pengunjung.push(newIjal);
    res.status(201).json(newIjal);

});
router.delete('/:id',(req, res) => {
    const ijalIndex = pengunjung.findIndex(t=> t.id === parseInt(req.params.id));
    if(ijalIndex===-1)return res.status(404).json({Message: 'Tugas tidak ditemukan'});

    const deletedijal = pengunjung.splice(ijalIndex,1)[0];
    res.status(200).json({Message: `Tugas' ${deletedijal.task}'telah dihapus`});
})
router.put('/:id',(req, res) => {
    const ijal = pengunjung.find(t=> t.id === parseInt(req.params.id));
    if(!ijal)return res.status(404).json({Message: 'Tugas tidak ditemukan'});
    ijal.task = req.body.task || ijal.task

    res.status(200).json({
        Message: `Tugas' dengan ID ${ijal.id}'telah diperbarui`,
        updatedIjal:ijal
    });
})

module.exports =router;