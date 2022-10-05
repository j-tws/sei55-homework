let db; // for storing out database connection

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(

  'mongodb://127.0.0.1:27017', // URL to reach the server
  {}, // options object
  (err, client) => {

    // Check for errors
    if( err ){
      console.log('Error connecting to MonboDB server;'. err);
      process.exit( 1 ) // quit the program with a non-zero error code
    }

    // If we got this far, it means the connection was successful
    db = client.db('ba'); // use 'client' to select a database by name

    // TODO: how to Flight.destroy_all in MongoDB before we start inserting?

    db.collection('flights').deleteMany( {},(err, result) => {

      if( !err ){
        insertFlights();
      } 

    })

  }

); // .connect()

const insertFlights = () => {

  db.collection('flights').insertMany(
    [
      {
        flight_number: 'BA123',
        origin: 'SYD',
        destination: 'MEL',
        departure_date: new Date('2022-11-20T04:20:00Z'),
        airplane: { name: '737 Max', rows: 20, cols: 6 },
        reservations: [
          { row: 1, col: 1, user_id: 10 },  // NOT real user_ids, just placeholders
          { row: 2, col: 3, user_id: 10 },
          { row: 3, col: 3, user_id: 11 },
        ] // reservations[]
      },
      
      {
        flight_number: 'BA456',
        origin: 'SYD',
        destination: 'MEL',
        departure_date: new Date('2022-11-23T04:20:00Z'),
        airplane: { name: '767', rows: 16, cols: 4 },
        reservations: [
          { row: 1, col: 1, user_id: 10 },  // NOT real user_ids, just placeholders
          { row: 1, col: 3, user_id: 11 },
          { row: 1, col: 3, user_id: 11 },
        ] // reservations[]
      },
    ], // end of array of flights to insert

    (err, result) => {
      
      if(err){
        console.log('Error inserting flights:', err);
        return
      }

      console.log(`Success! Added ${result.insertedCount} flights.`);

      // process.exit(0); // no errors
      printFlights(); // query the flights we just added and print them out

      // process.exit(0)

    }

  )

}

const printFlights = async() => {

  // Like ActiveRecord Flight.all
  // process.exit(0)

  // Use the promise-based find function below

  // 1. Chaining .then() .catch()
  // promiseFindFlights()
  //   .then( data => {
  //     console.log('flights:', data);
  //     process.exit(0) // quit back  to $ prompt
  //   })
  //   .catch( e => {
  //     console.error('problem', e)
  //     process.exit(1) // quit back to $ prompt but with error status
  //   });

  /// 2. async/await syntax with try/catch block
  // try {
  //   const data = await promiseFindFlights()
  //   console.log('flights:', data);
  //   process.exit(0) // quit back to $ prompt
  // }catch( e ){
  //   console.error('problem!', e)
  //   process.exit(1) // quit back to $ prompt with error status
  // }

  try {
    const answer = await timerPromise( 500 )
    console.log('answer:', answer);
    process.exit(0)
  }catch( e ){
    console.error('error!', e);
    process.exit(1)
  }
  

};

const promiseFindFlights = () => {

  return new Promise( (resolve, reject) => {

    db.collection('flights').find().toArray( (err, flights) => {
      
      // Fail! Promise should reject with 'err'
      if(err){
        // console.log('Error retrieving flights:', err);
        // return

        // This will trigger a .catch( error => {}), providing 'err' as the catch callback's argument
        // OR for async/await, using a try/catch, this will trigger the catch block and provide the
        // 'err' as the catch block's error argument
        reject( err )
      }
      
      // Success! Promise should resolve here with 'flights'

      // This will trigger a .then( data => {} ), providing 'flights' as the resolved data
      // OF if using async/await, it will cause the blocking await to return the flights
      resolve( flights ); // this will trigger a .then( data => {})

    
    })
  }); // return new Promise
  
}; // promiseFindFlights()

const timerPromise = ( delay ) => {

  return new Promise( (resolve, reject) => {

    setTimeout( () => {

      // Flip a coin and resolve 50% of the time, and reject 50%
      if( Math.random() > 0.5 ){
        resolve("RESOLVED!")
      } else {
        reject("REJECTED!")
      }

    }, delay) 

  }) 


}
