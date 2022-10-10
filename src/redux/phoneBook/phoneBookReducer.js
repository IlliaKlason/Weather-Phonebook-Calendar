import {combineReducers,createReducer } from "@reduxjs/toolkit";
import { getContacts,addContact,deleteContact, editContact } from "./operation";
import { filterContacts } from './phoneBookActions';


const contactsItemReducer = createReducer([], (builder) => {
  builder.addCase(getContacts.fulfilled, (_, { payload }) => payload);

  builder.addCase(addContact.fulfilled, (state, { payload }) => [...state, payload]);

   builder.addCase(editContact.fulfilled, (state, { payload }) => state.map((item) => item.id === payload.id ? payload : item
  ));

  builder.addCase(deleteContact.fulfilled, (state, { payload }) => state.filter((item) => item.id !== payload
  ));

});

const loadingReducer = createReducer(false, (builder) => {
  ///GET_CONTACTS
  builder.addCase(getContacts.pending, () => true);
  builder.addCase(getContacts.fulfilled, () => false);
  builder.addCase(getContacts.rejected, () => false);
  ///ADD_CONTACTS
  builder.addCase(addContact.pending, () => true);
  builder.addCase(addContact.fulfilled, () => false);
  builder.addCase(addContact.rejected, () => false);
  ///EDIT_CONTACTS
  builder.addCase(editContact.pending, () => true);
  builder.addCase(editContact.fulfilled, () => false);
  builder.addCase(editContact.rejected, () => false);
  ///DELETE_CONTACTS
  builder.addCase(deleteContact.pending, () => true);
  builder.addCase(deleteContact.fulfilled, () => false);
  builder.addCase(deleteContact.rejected, () => false);
});
const errorReducer = createReducer(null,(builder) => {
   ///GET_CONTACTS
  builder.addCase(getContacts.pending, () => null);
  builder.addCase(getContacts.rejected, (_,{payload}) => payload);
  ///ADD_CONTACTS
  builder.addCase(addContact.pending, () => null);
  builder.addCase(addContact.rejected, (_, { payload }) => payload);
  ///EDIT_CONTACTS
  builder.addCase(editContact.pending, () => null);
  builder.addCase(editContact.rejected, (_,{payload}) => payload);
  ///DELETE_CONTACTS
  builder.addCase(deleteContact.pending, () => null);
  builder.addCase(deleteContact.rejected, (_,{payload}) => payload);
  
})

const filterContactsReducer = createReducer('', (builder) => {
  builder.addCase(filterContacts, (_, { payload }) => payload);
})

const dataReducer = combineReducers({
    item: contactsItemReducer,
    loading: loadingReducer,
    error: errorReducer
})
const phoneBookReducer = combineReducers({
    data:dataReducer,
    filter: filterContactsReducer,
    
})

export default phoneBookReducer;
