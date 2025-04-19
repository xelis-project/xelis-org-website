import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Xelis custom colors
				xelis: {
					'blue': '#00f2c3', // Changed from '#3B82F6' to turquoise
					'light-blue': '#33f7ce', // Lighter turquoise
					'dark-blue': '#00d6ab', // Darker turquoise
					'gray': '#F3F4F6',
					'dark-gray': '#9CA3AF',
					'black': '#111827',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.7s ease-out',
				'pulse-slow': 'pulse-slow 4s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
			},
			boxShadow: {
				'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
				'button': '0 4px 14px 0 rgba(0, 0, 0, 0.08)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%',
						color: 'var(--tw-prose-body)',
						a: {
							color: 'var(--tw-prose-links)',
							'&:hover': {
								color: '#00f2c3',
							},
						},
						h1: {
							color: 'var(--tw-prose-headings)',
							fontWeight: '700',
						},
						h2: {
							color: 'var(--tw-prose-headings)',
							fontWeight: '600',
						},
						h3: {
							color: 'var(--tw-prose-headings)',
							fontWeight: '600',
						},
						code: {
							color: 'var(--tw-prose-code)',
							backgroundColor: 'var(--tw-prose-code-bg)',
							padding: '0.25rem 0.4rem',
							borderRadius: '0.25rem',
							fontWeight: '500',
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
						blockquote: {
							borderLeftColor: '#00f2c3',
						},
					},
				},
				dark: {
					css: {
						color: 'rgb(229, 231, 235)',
						a: {
							color: '#00f2c3',
						},
						h1: {
							color: 'rgb(255, 255, 255)',
						},
						h2: {
							color: 'rgb(255, 255, 255)',
						},
						h3: {
							color: 'rgb(255, 255, 255)',
						},
						blockquote: {
							color: 'rgb(229, 231, 235)',
							borderLeftColor: '#00f2c3',
						},
						code: {
							color: 'rgb(229, 231, 235)',
							backgroundColor: 'rgba(55, 65, 81, 0.5)',
						},
					},
				},
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	],
} satisfies Config;