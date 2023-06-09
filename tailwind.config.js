/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: "'Raleway', sans-serif",
				oswald: "'Oswald', sans-serif",
				inter: "'Inter', sans-serif",
			},
			colors: {
				'7108F6': '#7108F6',
				DFC7FF: '#DFC7FF',
				BF1231: '#BF1231',
				FFEEF0: '#FFEEF0',
				FF012F: '#FF012F',
				F9F9F9: '#F9F9F9',
				F4F4F4: '#F4F4F4',
				'9B9B9B': '#9B9B9B',
				575555: '#575555',
				EEEEEE: '#EEEEEE',
				'08F692': '#08F692',
				'1E1E1E': '#1E1E1E',
				FBBC05: '#FBBC05',
				EADAFF: '#EADAFF',
				FFE9ED: '#FFE9ED',
				D9D9D9: '#D9D9D9',
				FB9905: '#FB9905',
				FFF3D1: '#FFF3D1',
				F3F3F3: '#F3F3F3',
			},
			borderRadius: {
				3: '3px',
				6: '6px',
			},
			fontSize: {
				12: '12px',
				10: '10px',
				13: '13px',
			},
			maxWidth: {
				extra: '1500px',
			},
			screens: {
				extra: '1500px',
				mini: '1332px',
				mid: '768px',
				'1235px': '1235px',
				'550px': '550px',
				'397px': '397px',
			},
		},
	},
	plugins: [],
};
