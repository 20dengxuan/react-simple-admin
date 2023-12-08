import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './modules';
import { TypedUseSelectorHook, useSelector as selector, useDispatch as dispatch } from 'react-redux';

type GetStateFunType = typeof store.getState;

type IRootState = ReturnType<GetStateFunType>;

// redux 持久化配置
const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistReducerConfig = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistReducerConfig,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// 创建持久化 store
const persistor = persistStore(store);

export const useSelector: TypedUseSelectorHook<IRootState> = selector;
export const useDispatch = dispatch;

export { store, persistor };
