import React from 'react'
import {AppBar, Button, Typography} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import {Link} from 'react-router-dom'
import AuthService from "../Service/AuthService";

const Navbar = () => {
    const userJson = localStorage.getItem('user')
    const user = JSON.parse(userJson)
    // const isAdmin = user?.roles.some(role => role === 'ADMIN') ? true : false

    return (
        <div style={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        ServiceAPP </Typography>
                    {/* Zaktualizowane linki */}
                    <Button color="inherit" component={Link} to="/dashboard">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/add-issue">
                        Zgłoś Usterkę
                    </Button>
                    <Button color="inherit" component={Link} to="/assign_usterka_to_zespol">
                        Przypisz Usterkę
                    </Button>
                    <Button color="inherit" component={Link} to="/data-actions">
                        Akcje Danych
                    </Button>
                    <Button color="inherit" component={Link} to="/car">
                        Zarządzanie Samochodami
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        Użytkownicy
                    </Button>
                    <Button color="inherit" component={Link} to="/teams">
                        Zespoły
                    </Button>
                    <Button color="inherit" onClick={() => AuthService.logout()} component={Link} to="/login">
                        Wyloguj się
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
