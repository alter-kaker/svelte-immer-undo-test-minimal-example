import { writable, type Subscriber, type Updater, type Writable } from 'svelte/store';
import { produce } from 'immer';

export type TestState = {
  number: string
  canUndo: boolean
  canRedo: boolean
  object: {field: string[]}
}

export type EditorState = {
	selected: string;
	canUndo: boolean;
	canRedo: boolean;
  nested: {[property: string]: string[]};
};

export type VarTypesData = { [property: string]: { dataType: string; options?: string[] } };
