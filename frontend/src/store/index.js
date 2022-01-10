import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { clientReducer } from './clientSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const useAppDispatch = () => useDispatch();
