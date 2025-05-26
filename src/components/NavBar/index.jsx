import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NavBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const navigate = useNavigate();

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};


	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "left"
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	return (
		<Box>
			{/* <AppBar position="static"> */}

				<Toolbar>
					<Box sx={{ flexGrow: 1 }} />
					<Box>
						{/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="error">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton size="large" color="inherit">
							<Badge badgeContent={17} color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton> */}

						<IconButton
							size="large"
							edge="end"
							aria-label="Usuário"
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle fontSize="large" />
						</IconButton>
					</Box>
				</Toolbar>
			{/* </AppBar> */}

			{renderMenu}
		</Box>
	);
}
