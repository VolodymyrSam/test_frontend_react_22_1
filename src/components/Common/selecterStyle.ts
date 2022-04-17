import {CSSProperties} from 'react';

// for styles options in react-select
export const selectCustomStylesFun = () => {
	return {
		// for more information look at node_modules\@types\react-select\src\styles.d.ts
		control: (base: CSSProperties, state) => {
			return {
				...base,
				background: "transparent"
			};
		},
		valueContainer: (provided: CSSProperties, state: any) => ({
			...provided,
		}),
		menu: (base: CSSProperties, state: any) => {
			return {
				...base,
			};
		},
		input: (styles: CSSProperties) => ({
			...styles
		})
	};
};
