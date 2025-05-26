import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import { Padding } from "@mui/icons-material";
import ApartmentIcon from "@mui/icons-material/Apartment";

const data = [
	{ icon: <People />, label: "Funcionarios" },
	{ icon: <ApartmentIcon />, label: "Unidades" },
	{ icon: <PermMedia />, label: "Projetos" },
	{ icon: <Public />, label: "Hosting" }
];

const FireNav = styled(List)({
	"& .MuiListItemButton-root": {
		paddingLeft: 24,
		paddingRight: 24
	},
	"& .MuiListItemIcon-root": {
		minWidth: 0,
		marginRight: 16
	},
	"& .MuiSvgIcon-root": {
		fontSize: 20	
	}
});

export function SideBar() {
	// const [open, setOpen] = React.useState(true);


	function mudarPagina(e){
		console.log(e)
	}
	return (
		<Box sx={{ display: "flex" }}>
			<Paper elevation={4} sx={{ maxWidth: 224 }}>
				<FireNav component="nav">
					<ListItem>
						<ListItemIcon sx={{ fontSize: 40 }}>🏛️</ListItemIcon>
						<ListItemText primary="Facilities" slotProps={{}} sx={{ fontSize: 34}}/>
					</ListItem>
					{/* <Divider /> */}

					{/* <ListItem component="div" disablePadding>
							<ListItemButton sx={{ height: 56 }}>
								<ListItemIcon>
									<Home color="primary" />
								</ListItemIcon>
								<ListItemText
									primary="Project Overview"
									primaryTypographyProps={{
										color: "primary",
										fontWeight: "medium",
										variant: "body2"
									}}
								/>
							</ListItemButton>
							<Tooltip title="Project Settings">
								<IconButton
									size="large"
									sx={{
										"& svg": {
											color: "rgba(255,255,255,0.8)",
											transition: "0.2s",
											transform: "translateX(0) rotate(0)"
										},
										"&:hover, &:focus": {
											bgcolor: "unset",
											"& svg:first-of-type": {
												transform: "translateX(-4px) rotate(-20deg)"
											},
											"& svg:last-of-type": {
												right: 0,
												opacity: 1
											}
										},
										"&::after": {
											content: '""',
											position: "absolute",
											height: "80%",
											display: "block",
											left: 0,
											width: "1px",
											bgcolor: "divider"
										}
									}}
								>
									<Settings />
									<ArrowRight sx={{ position: "absolute", right: 4, opacity: 0 }} />
								</IconButton>
							</Tooltip>
						</ListItem>
						<Divider /> */}

					<Box sx={{ minWidth: 224 }}>
						{/* <ListItemButton
								alignItems="flex-start"
								onClick={() => setOpen(!open)}
								sx={[
									{
										px: 4,
										pt: 2.5,
										pb: 2.5,
										minWidth: 256
									}
								]}
							>
								<ListItemText primary="Build" sx={{ my: 0 }} />
								<KeyboardArrowDown
									sx={[
										{
											mr: -2,
											opacity: 1,
											transition: "0.2s"
										},
										open
											? {
													transform: "rotate(-180deg)"
											  }
											: {
													transform: "rotate(0)"
											  }
									]}
								/>
							</ListItemButton> */}

						{open &&
							data.map((item) => (
								<ListItemButton key={item.label} onClick={(e)=>mudarPagina(e)} sx={{ py: 1, px: 0, minHeight: 32 }}>
									<ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
									<ListItemText primary={item.label} />
								</ListItemButton>
							))}
					</Box>
				</FireNav>
			</Paper>
		</Box>
	);
}
