const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (!index) {
    throw new Error("Contact not found");
  }
  const [contact] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };