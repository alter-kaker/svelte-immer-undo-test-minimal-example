<script lang="ts">
  import { produce } from "immer";
  import { type EditorState } from "$lib";
  import { writable } from "svelte/store";

  const { data }: { data: { nested: { [property: string]: string[] } } } =
    $props();

  const statusImmer = writable({
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

  const selectImmer = (id: string) => () => {
    $statusImmer = produce($statusImmer, (draft: EditorState) => {
      draft.selected = id;
    });
  };

  const selectWritable = (id: string) => () => {
    $statusWritable.selected = id;
  };
</script>


<button data-testid="button-immer" onclick={selectImmer("immer")}>b-immer</button>
<button data-testid="button-writable" onclick={selectWritable("writable")}
  >b-writable</button
>

<div>{$statusImmer.selected}</div>
<div>{$statusWritable.selected}</div>