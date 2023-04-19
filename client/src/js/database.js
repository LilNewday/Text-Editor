import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // Output a log message to indicate that we are putting data to the database
	console.log("PUT to the database");

  // Open a connection to a database called "jate" with version 1
	const jateDb = await openDB("jate", 1);

  // Start a new transaction on the "jate" object store with readwrite access
	const tx = jateDb.transaction("jate", "readwrite");

  // Get a reference to the "jate" object store
	const store = tx.objectStore("jate");

  // Use the store.put method to save the provided content as an object with an ID of 1
	const request = store.put({ id: 1, value: content });

  // Wait for the request to complete and store the result
	const result = await request;

  // Output a log message to indicate that the data has been saved to the database, 
  //along with the result of the put operation
	console.log("data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // Output a log message to indicate that we are getting data from the database
	console.log("GET from the database");

  // Open a connection to a database called "jate" with version 1
	const jateDb = await openDB("jate", 1);

  // Start a new transaction on the "jate" object store with readonly access
	const tx = jateDb.transaction("jate", "readonly");

  // Get a reference to the "jate" object store
	const store = tx.objectStore("jate");

  // Use the store.get method to retrieve the object with an ID of 1 from the store
	const request = store.get(1);

  // Wait for the request to complete and store the result
	const result = await request;

  // If the result is not null, output a log message to indicate that the data has been retrieved 
  // from the database, along with the retrieved data
	// Otherwise, output a log message to indicate that the data was not found in the database
	result
		? console.log(" data retrieved from the database", result.value)
		: console.log(" data not found in the database");

    // Return the value property of the retrieved object, or null if the object was not found
	return result?.value;
};

initdb();
