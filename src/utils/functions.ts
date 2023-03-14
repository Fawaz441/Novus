export const formatStatistic = (stat: number) => {
	if (stat >= 1000000) {
		return `${Math.ceil(stat / 1000000)}m`;
	}
	if (stat >= 1000) {
		return `${Math.ceil(stat / 1000)}k`;
	}
};

export default 1;
