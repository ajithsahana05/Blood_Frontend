import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import '../stylesheet.css';

import {  useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false)
    const handleMenuToggle = () => {
        setOpen(!open)


    }
	// const handleClick = () =>{
    //     console.log("???????????????");
	// 	localStorage.clear();
        

    // }
return (
	<AppBar position="static" style={{backgroundColor:'#ff0e0e',position: 'fixed',top:'0px'}}>
		<Toolbar>
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}
            onClick={handleMenuToggle}
		>
		</IconButton>
		<Typography variant="h6"
			component="div" sx={{ flexGrow: 1 }}>
			BloodBank Management
		</Typography>
		{/* <button onClick={() => {handleClick()}}>Logout</button> */}
		</Toolbar>
	</AppBar>
);
}
