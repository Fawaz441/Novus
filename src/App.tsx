import { ModalContext } from 'components/contexts';
import React, { useMemo, useState } from 'react';
import AppRoutes from 'Routes';
import { MODALS } from 'utils/constants';

function App() {
	const [activeModal, setActiveModal] = useState<MODALS | null>(null);
	const modalStateValue = useMemo(
		() => ({ activeModal, setActiveModal }),
		[activeModal]
	);

	return (
		<div className="App">
			<ModalContext.Provider value={modalStateValue}>
				<AppRoutes />
			</ModalContext.Provider>
		</div>
	);
}

export default App;
