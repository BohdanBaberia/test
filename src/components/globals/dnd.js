import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, useDroppable
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMoveImmutable } from 'array-move';



const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  const Render = props.render;

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <Render {...{ [props.itemProp]: props.item }} onDelete={props.onDelete} />
    </div>
  )
};


const Droppable = ({ id, items, itemProp, keyField, render,onDelete }) => {
  const { setNodeRef } = useDroppable({ id });

  const droppableStyle = {
    //padding: "20px 10px",
    //border: "1px solid black",
    //borderRadius: "5px",
    //minWidth: 110
  };

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      {items && items.map((item) => (
        <SortableItem 
          render={render} 
          key={item[keyField]}
          id={item}
          itemProp={itemProp}
          item={item} 
          onDelete={onDelete}/>
      ))}
    </SortableContext>
  )
};


function Dnd({ items: startItems, render, itemProp, keyField, onChange, horizontal, onDelete }) {
  const [items, setItems] = useState(
    startItems
  );
  useEffect(() => setItems(startItems), [startItems]);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(items)
    }
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = ({ active, over }) => {
    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.data.current?.sortable.index || 0;

    setItems((items) => {
      return arrayMoveImmutable(items, activeIndex, overIndex);
    });
  }

  const containerStyle = { display: horizontal ? "flex" : '' };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div style={containerStyle}>
        <Droppable 
          id="droppable"
          items={items}
          itemProp={itemProp}
          keyField={keyField}
          render={render}
          onDelete={onDelete}
        />
          
      </div>
    </DndContext>
  );
}


export const Item = ({data,onDelete}) =>
    <Paper elevation={3}>
        <Grid container justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: 'column', sm: 'row' }}
              sx={{ padding: `10px` }}>
            <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                {data.name}
            </Grid>
            <Grid item sx={{ order: { xs: 1, sm: 2 } }}>
                <IconButton color="primary" aria-label="upload picture" component="label" onClick={(e) => onDelete(data)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Paper>;

export default Dnd;
