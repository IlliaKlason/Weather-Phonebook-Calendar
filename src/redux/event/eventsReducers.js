import {combineReducers,createReducer } from "@reduxjs/toolkit";
import { getEvents, addEvent, toggleEvent, deleteEvent, editEvent } from "./eventOperation";



const eventsItemReducer = createReducer([], (builder) => {
  builder.addCase(getEvents.fulfilled, (_, { payload }) => payload);

  builder.addCase(addEvent.fulfilled, (state, { payload }) => [...state, payload]);

  builder.addCase(toggleEvent.fulfilled, (state, { payload }) => state.map((item) => item.id === payload.id ? payload : item));

  builder.addCase(editEvent.fulfilled, (state, { payload }) => state.map((item) => {
    console.log(payload)
    return item.id === payload.id ? payload : item
  }
  ));

  builder.addCase(deleteEvent.fulfilled, (state, { payload }) => state.filter((item) => item.id !== payload.id
  ));

});

const loadingReducer = createReducer(false, (builder) => {
  ///GET_EVENTS
  builder.addCase(getEvents.pending, () => true);
  builder.addCase(getEvents.fulfilled, () => false);
  builder.addCase(getEvents.rejected, () => false);
  ///ADD_EVENT
  builder.addCase(addEvent.pending, () => true);
  builder.addCase(addEvent.fulfilled, () => false);
  builder.addCase(addEvent.rejected, () => false);
  ///TOGGLE_EVENT
  builder.addCase(toggleEvent.pending, () => true);
  builder.addCase(toggleEvent.fulfilled, () => false);
  builder.addCase(toggleEvent.rejected, () => false);
  ///EDIT_EVENT
  builder.addCase(editEvent.pending, () => true);
  builder.addCase(editEvent.fulfilled, () => false);
  builder.addCase(editEvent.rejected, () => false);
  ///DELETE_EVENT
  builder.addCase(deleteEvent.pending, () => true);
  builder.addCase(deleteEvent.fulfilled, () => false);
  builder.addCase(deleteEvent.rejected, () => false);
});
const errorReducer = createReducer(null,(builder) => {
   ///GET_EVENTS
  builder.addCase(getEvents.pending, () => null);
  builder.addCase(getEvents.rejected, (_,{payload}) => payload);
  ///ADD_EVENTS
  builder.addCase(addEvent.pending, () => null);
  builder.addCase(addEvent.rejected, (_, { payload }) => payload);
  ///TOGGLE_EVENT
  builder.addCase(toggleEvent.pending, () => null);
  builder.addCase(toggleEvent.rejected, (_,{payload}) => payload);
  ///EDIT_EVENTS
  builder.addCase(editEvent.pending, () => null);
  builder.addCase(editEvent.rejected, (_,{payload}) => payload);
  ///DELETE_EVENTS
  builder.addCase(deleteEvent.pending, () => null);
  builder.addCase(deleteEvent.rejected, (_,{payload}) => payload);
  
})

const dataReducer = combineReducers({
    item: eventsItemReducer,
    loading: loadingReducer,
    error: errorReducer
})
const eventsReducer = combineReducers({
    data:dataReducer,
    
})

export default eventsReducer;
