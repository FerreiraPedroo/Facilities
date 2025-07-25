import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Root } from "pages/Root";
import { Home } from "pages/Home";
import { Requisicoes } from "pages/Requisicoes";



export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			{/* <Route path="/" element={<Login />} /> */}
			<Route element={<Root />}>
				<Route path="/" element={<Home />} />
				<Route path="/requisicoes" element={<Requisicoes />} />
			</Route>
		</Route>
	)
);