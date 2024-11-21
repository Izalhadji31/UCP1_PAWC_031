const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua tugas
router.get('/', (req, res) => {
    db.query('SELECT * FROM pengunjung', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan tugas berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM pengunjung WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Data tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan tugas baru
router.post('/', (req, res) => {
    const { nama } = req.body;
    if (!nama|| nama.trim() === '') {
        return res.status(400).send('Data tidak boleh kosong');
    }

    db.query('INSERT INTO pengunjung (nama) VALUES (?)', [nama.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newIjal = { id: results.insertId, nama: nama.trim(), noTelepon: noTelepon.trim() };
        res.status(201).json(newIjal);
    });
});

// Endpoint untuk memperbarui tugas
router.put('/:id', (req, res) => {
    const { nama, noTelepon, } = req.body;

    db.query('UPDATE pengunjung SET nama = ?, noTelepon = ? WHERE id = ?', [nama, noTelepon, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Data tidak ditemukan');
        res.json({ id: req.params.id, nama, noTelepon, });
    });
});

// Endpoint untuk menghapus tugas
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM pengunjung WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Data tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;
