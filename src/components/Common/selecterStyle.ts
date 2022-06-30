import { CSSProperties } from 'react';

// for styles options in react-select
export const selectCustomStylesFun = (styles?) => {
  const control = styles ? {...styles.control} : {};
  const valueContainer = styles ? {...styles.valueContainer} : {};
	return {
		// for more information look at node_modules\@types\react-select\src\styles.d.ts
		control: (base: CSSProperties, state) => {
			return {
				...base,
        background: "transparent",
        ...control
			};
		},
		valueContainer: (provided: CSSProperties, state: any) => ({
      ...provided,
      ...valueContainer
		}),
		menu: (base: CSSProperties, state: any) => {
			return {
        ...base,
        marginTop: 0
			};
		},
		input: (_styles: CSSProperties) => ({
      ..._styles
		})
	};
};
