import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const UpdateUserForm = ({ user, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        imie: user.imie,
        nazwisko: user.nazwisko,
        email: user.email,
        funkcje_id: user.funkcje_id,
        telefon: user.telefon,
        haslo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user.id, formData);
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Aktualizuj Użytkownika</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField label="Imię" name="imie" value={formData.imie} onChange={handleChange}  fullWidth margin="normal" />
                    <TextField label="Nazwisko" name="nazwisko" value={formData.nazwisko} onChange={handleChange}  fullWidth margin="normal" />
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange}  fullWidth margin="normal" />
                    <TextField label="Funkcje ID" name="funkcje_id" type="number" value={formData.funkcje_id} onChange={handleChange}  fullWidth margin="normal" />
                    <TextField label="Telefon" name="telefon" value={formData.telefon} onChange={handleChange}  fullWidth margin="normal" />
                    <TextField label="Hasło" name="haslo" type="password" value={formData.haslo} onChange={handleChange}  fullWidth margin="normal" />
                    <DialogActions>
                        <Button onClick={onClose}>Anuluj</Button>
                        <Button type="submit">Aktualizuj</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
