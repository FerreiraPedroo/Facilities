import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { SideBar } from "components/SideBar";
import { NavBar } from "components/NavBar/index.jsx";

import * as S from "./styles.jsx";

export function Root() {
	const navigate = useNavigate();

	return (
		<S.Container>
				<SideBar />
			<S.CenterContainer>
				<NavBar />
				<Outlet />
			</S.CenterContainer>
		</S.Container>
	);
}
