'use client';

/* Core */
import { Provider } from 'react-redux';
/* Instruments */
import { reduxStore } from './redux/store';

const StoreProvider = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};

export default StoreProvider;
