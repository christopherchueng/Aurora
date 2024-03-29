import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import trackReducer from './trackReducer';
import commentReducer from './commentReducer';
import userReducer from './user'
import searchReducer from './search';
import likeReducer from './likes';
import mediaControlReducer from './mediaControl';

const rootReducer = combineReducers({
  session: sessionReducer,
  track: trackReducer,
  comment: commentReducer,
  user: userReducer,
  search: searchReducer,
  like: likeReducer,
  mediaControl: mediaControlReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
