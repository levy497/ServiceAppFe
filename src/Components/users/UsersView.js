import React, {useState, useEffect} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    TablePagination,
    TableFooter
} from '@mui/material';
import axios from "axios";
import {UpdateUserForm} from "./UpdateUserForm";
import Navbar from "../Navbar";

const UsersView = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);

    const getUsers = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/users?page=${page + 1}`,config);
            setUsers(response.data.users);
            setPage(response.data.current_page - 1);
            setTotalPages(response.data.pages);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych użytkowników:', error);
        }
    };
    useEffect(() => {


        getUsers();
    }, []);
    const handleUpdate = async (userId, updatedUserData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.put(`http://127.0.0.1:5000/api/users/${userId}`, updatedUserData, config);

            console.log('Użytkownik zaktualizowany.');
            // Możesz tutaj również zaktualizować stan użytkownika w Twojej aplikacji, jeśli to konieczne
        } catch (error) {
            console.error('Wystąpił błąd podczas aktualizacji użytkownika:', error);
        }
    };
    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`http://127.0.0.1:5000/api/delete_users/${userId}`, config);

        } catch (error) {
            // Obsługa błędów
            console.error('Wystąpił błąd przy usuwaniu Użytkownika:', error);
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <>
            <Navbar/>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Imię</TableCell>
                            <TableCell>Nazwisko</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rola</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.imie}</TableCell>
                                <TableCell>{user.nazwisko}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.rola}</TableCell>
                                <TableCell>
                                    <Button onClick={() => setSelectedUser(user)}>Aktualizuj</Button>
                                    <Button onClick={() => handleDelete(user.id)}>Usuń</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                count={totalPages * 10}
                                rowsPerPage={10}
                                page={page}
                                onPageChange={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
            {selectedUser && (
                <UpdateUserForm
                    user={selectedUser}
                    onSubmit={(userId, formData) => {
                        handleUpdate(userId, formData);
                        setSelectedUser(null); // Zamknij formularz po aktualizacji
                    }}
                />
            )}
        </>
    )
        ;
};

export default UsersView;
