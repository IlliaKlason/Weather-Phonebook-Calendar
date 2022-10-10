export const contactsState = (state) => state.contacts.data.item;
export const loadingSelector = (state) => state.contacts.data.loading;
export const errorSelector = (state) => state.contacts.data.error;
export const filterPhoneBook = (state) => state.contacts.filter;
