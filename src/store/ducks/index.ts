import { combineReducers } from 'redux';

import schedule from './schedule';
import activity_record from './activity_record';

export default combineReducers({
    schedule,
    activity_record
})