import { Outlet } from "react-router-dom";
import { AppMenu } from "@components/Menu";
import { Container } from "@chakra-ui/react";


export function Root() {
	return (
		<Container padding="0" maxWidth={"full"}>
			<AppMenu />
			<Outlet />
		</Container>
	)
}

