import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000
	},
	resolve: {
		alias: {
			routes: "/src/routes",
			components: "/src/components",
			pages: "/src/pages",
			services: "/src/services",
			modules: "/src/modules",
			helper: "/src/helper",
			styles: "/src/styles",
			config: "/src/config",
			assets: "/src/assets"
		}
	}
});
