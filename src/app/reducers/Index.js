import { reducer as formReducer } from 'redux-form';
import article from './Article';
import category from './Category';
import tag from './Tag';

export default {
  article,
  category,
  tag,
  form: formReducer
} 
