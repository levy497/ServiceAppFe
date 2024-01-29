import React, {useState, useEffect} from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, Button} from '@mui/material';
import Navbar from "../Navbar";
import axios from "axios";
import {TeamNameChangeForm} from "./TeamNameChangeForm";

const TeamsView = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    const getZespoły = async () => {
        try {
            const token = localStorage.getItem('token'); // Pobranie tokena
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://127.0.0.1:5000/api/get_zespoly', config);
            const teamsData = response.data.zespoly;
            const transformedTeams = Object.keys(teamsData).map(key => {
                return {
                    nazwa: key,
                    id: teamsData[key].id_zespolu,
                    czlonkowie: teamsData[key].czlonkowie
                };
            });

            setTeams(transformedTeams);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych zespołów:', error);
        }
    };


    useEffect(() => {

        getZespoły();
    }, []);
    const handleDeleteTeam = async (teamId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`http://127.0.0.1:5000/api/delete_zespol/${teamId}`, config);
            setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
            console.log(`Zespół o ID ${teamId} został usunięty.`);
        } catch (error) {
            // Obsługa błędów
            console.error('Wystąpił błąd przy usuwaniu zespołu:', error);
        }
    };
    const handleChangeTeamName = async (teamId, newTeamName) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const body = {
                nowa_nazwa: newTeamName
            };

            await axios.put(`http://127.0.0.1:5000/api/update_zespol/${teamId}`, body, config);

            // Aktualizacja stanu po zmianie nazwy zespołu
            setTeams(prevTeams => prevTeams.map(team => {
                if (team.id === teamId) {
                    return { ...team, nazwa: newTeamName };
                } else {
                    return team;
                }
            }));

            console.log(`Nazwa zespołu o ID ${teamId} została zmieniona na ${newTeamName}.`);
        } catch (error) {
            console.error('Wystąpił błąd przy zmianie nazwy zespołu:', error);
        }
    };


    return (
        <>
            <Navbar/>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Zespołu</TableCell>
                            <TableCell>Nazwa Zespołu</TableCell>
                            <TableCell>Członkowie</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell>{team.id}</TableCell>
                                <TableCell>{team.nazwa}</TableCell>
                                <TableCell>
                                    {team.czlonkowie.map(czlonek =>
                                        <div key={czlonek.id}>{czlonek.imie} {czlonek.nazwisko}</div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {/*<Button onClick={() => handleChangeTeamName(team)}>Zmień Nazwę</Button>*/}
                                    <Button onClick={() => handleDeleteTeam(team.id)}>Usuń Zespół</Button>
                                    <Button onClick={() => setSelectedTeamId(team.id)}>Edytuj Nazwę</Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {selectedTeamId && (
                        <TeamNameChangeForm
                            teamId={selectedTeamId}
                            onSubmit={(teamId, newName) => {
                                handleChangeTeamName(teamId, newName);
                                setSelectedTeamId(null); // Zamknij formularz po wysłaniu
                            }}
                        />
                    )}
                </Table>
            </Paper>
        </>
    );
};

export default TeamsView;
