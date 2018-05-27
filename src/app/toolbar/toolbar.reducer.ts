import { ToolbarAction, ToolbarActionTypes } from 'src/app/toolbar/toolbar.actions';
import { ToolbarState } from 'src/app/toolbar/toolbar.state';

export const initialToolbarState: ToolbarState = {
  title: ''
};

export function toolbarReducer(state: ToolbarState = initialToolbarState, action: ToolbarAction): ToolbarState {
  switch (action.type) {
    case ToolbarActionTypes.SET_TITLE:
          return {
        ...state,
        title: action.title
      };
    default:
      return state;
  }
}
