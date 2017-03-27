import { createRouter } from '@expo/ex-navigation';

import sign from './view/sign';

export default createRouter(() => ({
	sign: () => sign,
}));
