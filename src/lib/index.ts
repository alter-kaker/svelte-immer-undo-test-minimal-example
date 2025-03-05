import { writable, type Subscriber, type Updater, type Writable } from 'svelte/store';
import { produce } from 'immer';

export type TestState = {
  number: string
  canUndo: boolean
  canRedo: boolean
  object: {field: string[]}
}

export function undoStore(
	editorState: EditorState
): Writable<EditorState> & { undo: () => void; redo: () => void } {
	const store = writable(editorState);
	const undoStack: EditorState[] = [];
	const redoStack: EditorState[] = [];

	function updateUndoRedoState(value: EditorState) {
		return produce(value, (draft: EditorState) => {
			draft.canUndo = undoStack.length > 0;
			draft.canRedo = redoStack.length > 0;
		});
	}

	return {
		subscribe: (run: Subscriber<EditorState>) => store.subscribe(run),

		update: (updater: Updater<EditorState>) => {
			redoStack.length = 0;

			store.update((value) => {
				undoStack.push(value);

				return updater(updateUndoRedoState(value));
			});
			return store.update(updater);
		},

		set: (value: EditorState) => {
			redoStack.length = 0;

			store.update((oldValue) => {
				undoStack.push(oldValue);
				return updateUndoRedoState(value);
			});
		},

		undo: () => {
			const lastState = undoStack.pop();
			if (lastState) {
				store.update((value) => {
					redoStack.push(value);
					return updateUndoRedoState(lastState);
				});
			}
		},

		redo: () => {
			const nextState = redoStack.pop();
			if (nextState) {
				store.update((value) => {
					undoStack.push(value);
					return updateUndoRedoState(nextState);
				});
			}
		}
	};
}

export type EditorState = {
	selected: string;
	canUndo: boolean;
	canRedo: boolean;
  nested: {[property: string]: string[]};
};

export type VarTypesData = { [property: string]: { dataType: string; options?: string[] } };
