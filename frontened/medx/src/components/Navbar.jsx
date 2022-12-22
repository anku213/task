import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>navigate('/')} >
                        MedX
                    </Typography>
                    {localStorage.getItem("token") ?
                        (<>
                            <Button variant='contained' onClick={() => {
                                localStorage.clear();
                                alert("You have been successfully logged out!!!")
                                navigate('/')

                            }} >Logout</Button>
                        </>) : (<>
                            <Button variant='contained' onClick={() => navigate('/signin')} >Login</Button>
                        </>)
                    }
                    {localStorage.getItem("token") ?
                        (<>
                            <h5 style={{marginLeft:"10px"}} > Welcome : </h5>
                        </>) : (<>
                            <Button style={{backGroundColor:"orange", marginLeft:"10px"}} variant='contained' onClick={() => navigate('/signup')} >Sign Up</Button>
                        </>)
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}