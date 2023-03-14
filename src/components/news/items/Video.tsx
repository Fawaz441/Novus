import React from 'react';
import woman from 'assets/images/woman.png';

const Video: React.FC = () => (
	<div className="border border-white rounded-[10px] h-[158px] overflow-hidden">
		<img
			src={woman}
			alt="Smiling Lady"
			className="h-full w-full object-cover"
		/>
	</div>
);

export default Video;
