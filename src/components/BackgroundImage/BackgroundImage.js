import React from 'react';
import Image from 'next/image';

import { bgWrap } from './BackgroundImage.module.css';

export default function BackgroundImage({ children, src, className, ...rest }) {
	return (
		<>
			{children}
			<div>
				<Image src={src} className={`${bgWrap} ${className}`} {...rest} />
			</div>
		</>
	);
}
