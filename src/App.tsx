import { ModalContext } from 'contexts';
import React, { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import AppRoutes from 'Routes';
import { MODALS } from 'utils/constants';
import { store } from 'store';

function App() {
	const [activeModal, setActiveModal] = useState<MODALS | null>(null);
	const modalStateValue = useMemo(
		() => ({ activeModal, setActiveModal }),
		[activeModal]
	);

	return (
		<div className="App">
			<Provider store={store}>
				<ModalContext.Provider value={modalStateValue}>
					<AppRoutes />
				</ModalContext.Provider>
			</Provider>
		</div>
	);
}

export default App;
