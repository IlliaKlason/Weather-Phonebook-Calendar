import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, saveItem,editItem, deleteItem } from '../../utils/api-fetch';

const getContacts = createAsyncThunk('contacts/getContactsStatus', (token) => getItems(token));

const addContact = createAsyncThunk('contact/addContactStatus', (newContact, thunkApi) => {

  const state = thunkApi.getState();
  const token = state.auth.token;
  return saveItem(newContact,token)
});

const editContact = createAsyncThunk('contact/editContactStatus', async(updateContact,thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;
  return editItem(updateContact, token)
});

const deleteContact = createAsyncThunk('contact/deleteContactStatus', async(removeContact,thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;
  await deleteItem(removeContact, token)
  return removeContact;
  
}
);
export { getContacts,addContact,editContact,deleteContact };

