import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Menu } from "@components/Menu";

export function Root() {
  return (
	<div className="w-full h-screen">
		<Menu/>
		<Outlet/>
	</div>
  )
}

