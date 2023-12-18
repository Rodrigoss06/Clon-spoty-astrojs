/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			padding: {
				'extra': 'clamp(16px,16px + (100vw - var(--left-sidebar-width,0px) - var(--panel-width,0px) - 600px)/424*8,24px)',
			  }
		},
	},
	plugins: [],
}
