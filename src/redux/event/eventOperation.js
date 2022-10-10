import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItems,toggleItem,editItem, saveItem, deleteItem } from "../../utils/eventsApi";

const API_ENDPOINT = "/events";

const getEvents = createAsyncThunk('events/getEventsStatus', () => getItems(API_ENDPOINT)
);

const addEvent = createAsyncThunk('event/addEventStatus', async (newEvent) => await saveItem(API_ENDPOINT, newEvent));

const toggleEvent = createAsyncThunk('event/toggleEventStatus', async (updateEvent) => await toggleItem(API_ENDPOINT, updateEvent));

const editEvent = createAsyncThunk('event/editEventStatus', async (updateEditEvent) => {
  console.log(updateEditEvent)
  return await editItem(API_ENDPOINT,updateEditEvent)
});

const deleteEvent = createAsyncThunk('event/deleteEventStatus', async (removeEvent) => await deleteItem(API_ENDPOINT, removeEvent.createdAt));

export { getEvents, addEvent, toggleEvent, editEvent, deleteEvent };
