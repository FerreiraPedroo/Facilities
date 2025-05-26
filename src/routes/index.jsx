import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Root } from "pages/Root";
import { Home } from "pages/Home";


export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			{/* <Route path="/" element={<Login />} /> */}
			<Route element={<Root />}>
				<Route path="/" element={<Home />} />
			</Route>
		</Route>
	)
);
