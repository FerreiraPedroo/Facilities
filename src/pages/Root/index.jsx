import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { AppMenu } from "@components/Menu";
import Container from '@mui/material/Container';


export function Root() {
  return (
	<div>
		<AppMenu/>
		<Outlet/>
	</div>
  )
}

