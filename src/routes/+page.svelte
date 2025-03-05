<script lang="ts">
  import { produce } from "immer";
  import { undoStore, type EditorState } from "$lib";
  import { writable } from "svelte/store";

  const { data }: { data: { nested: { [property: string]: string[] } } } =
    $props();
  const statusImmerUndo = undoStore({
    canRedo: false,
    canUndo: false,
    selected: "",
    nested: data.nested,
  });

  const statusImmer = writable({
    canRedo: false,
    canUndo: false,
    selected: "",
    nested: data.nested,
  });
  const statusUndo = undoStore({
    canRedo: false,
    canUndo: false,
    selected: "",
    nested: data.nested,
  });

  const statusWritable = writable({
    canRedo: false,
    canUndo: false,
    selected: "",
    nested: data.nested,
  });

  const selectImmerUndo = (id: string) => () => {
    $statusImmerUndo = produce($statusImmerUndo, (draft: EditorState) => {
      draft.selected = id;
    });
  };

  const selectImmer = (id: string) => () => {
    $statusImmer = produce($statusImmer, (draft: EditorState) => {
      draft.selected = id;
    });
  };

  const selectUndo = (id: string) => () => {
    $statusUndo.selected = id;
  };

  const selectWritable = (id: string) => () => {
    $statusWritable.selected = id;
  };
</script>

<button data-testid="button-immer-undo" onclick={selectImmerUndo("immer-undo")}
  >b-immer-undo</button
>

<button data-testid="button-immer" onclick={selectImmer("immer")}>b-immer</button>

<button data-testid="button-undo" onclick={selectUndo("undo")}>b-undo</button>

<button data-testid="button-writable" onclick={selectWritable("writable")}
  >b-writable</button
>

<div>{$statusImmerUndo.selected}</div>
<div>{$statusImmer.selected}</div>
<div>{$statusUndo.selected}</div>
<div>{$statusWritable.selected}</div>