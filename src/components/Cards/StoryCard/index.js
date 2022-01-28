import React, { useState, useEffect, useRef, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import sources from '../../../../sources';

function StoryCard({ onClose, storiesData }) {
	const { t } = useTranslation('common');
	const [storyPaused, setStoryPaused] = useState(false);
	const [storyIndex, setStoryIndex] = useState(0);
	const storyIndexRef = useRef(0);
	const duration = 2;
	useEffect(() => {
		// autoskip for story
		const interval = setInterval(() => {
			if (storyPaused) return;
			if (storyIndexRef.current === storiesData.img.length - 1) {
				onClose();
			}
			setStoryIndex(storyIndexRef.current + 1);
		}, duration * 1000);

		return () => clearInterval(interval);
	}, [storyPaused, storyIndex]);

	useEffect(() => {
		storyIndexRef.current = storyIndex;
	}, [storyIndex]);

	function getProgressBarClassName(index) {
		if (index < storyIndex) {
			return 'progress-bar progress-bar-finished';
		} else if (index === storyIndex) {
			return storyPaused
				? 'progress-bar progress-bar-active progress-bar-paused'
				: 'progress-bar progress-bar-active';
		} else {
			return 'progress-bar';
		}
	}

	const checkImage = storiesData.img[storyIndex].guidName
		? `${sources.imageMaxSrc}${storiesData.img[storyIndex].guidName}`
		: '/img/placeholder.jpg';

	return (
		<div
			style={{
				zIndex: '245',
			}}
			className='story-container'>
			<i
				style={{
					top: '20px',
					right: '20px',
				}}
				onClick={onClose}
				className='fas fa-times position-absolute text-white fs-3 cursor-pointer'></i>
			<div className='story justify-content-end pt-2 my-0'>
				<div className='title d-flex justify-content-space-between align-items-center'>
					<Image
						src={`${sources.imageMaxSrc}${storiesData.img[storyIndex].guidName}`}
						width={60}
						height={60}
						layout='intrinsic'
					/>
					<div className='details'>
						<span>#{storiesData.productStock}</span>
						<span>{storiesData.productName}</span>
					</div>
					<div className='spacer'></div>
					{storyPaused && <div className='pause'>PAUSED</div>}
				</div>
				<div className='progress-bars'>
					{storiesData.img.map((story, index) => (
						<div
							key={`${index}.ç.${story.id}`}
							className='progress-bar-container'>
							<div
								style={{ animationDuration: `${duration || 10}s` }}
								className={getProgressBarClassName(index)}></div>
						</div>
					))}
				</div>
				<div className='storyEl position-relative w-100'>
					<Image
						onClick={() => setStoryPaused(!storyPaused)}
						src={checkImage}
						width={600}
						height={400}
						layout='intrinsic'
						loading='eager'
						placeholder='blur'
						blurDataURL='/img/loadingImg.jpg'
					/>
					{storyIndex !== 0 && (
						<i
							className='fas fa-chevron-left bg-white position-absolute top-50 translate-middle fs-5 text-center cursor-pointer px-2 py-1 rounded-circle'
							style={{
								opacity: 0.5,
								left: '-40px',
							}}
							onClick={(e) => setStoryIndex((value) => value - 1)}></i>
					)}
					{storyIndex !== storiesData.img.length - 1 && (
						<i
							class='fas fa-chevron-right bg-white position-absolute top-50 translate-middle fs-5 text-center cursor-pointer px-2 py-1 rounded-circle'
							style={{
								opacity: 0.5,
								right: '-60px',
							}}
							color='white'
							onClick={(e) => setStoryIndex((value) => value + 1)}></i>
					)}
					<Link href={`detail/${storiesData.id}`}>
						<button
							className='btn-main position-absolute start-50 translate-middle fs-5 text-center text-white cursor-pointer px-2 py-1 rounded'
							style={{
								bottom: '25%',
								backgroundColor: 'rgba(0,0,0,0.75)',
							}}>
							{t('home:seeProduct')}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default memo(StoryCard);
