const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

(async () => {
  //open the database
  const db = await sqlite.open({
    filename: "./microphones.sqlite",
    driver: sqlite3.Database
  });

  await db.migrate({ force: true }); //force the migtation fo make sure it happens
  const microphones = await db.all("select * from microphone"); //phải có await nhé
  console.log(JSON.stringify(microphones, null, 4));
})();
