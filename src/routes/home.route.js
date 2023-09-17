// how to use a separate file in express

import express from "express";

// instantiate a router (miniature version of the app object, capable of doing all the same things that the app object does)
const router = express.Router();
import * as config from "../config.json" assert { type: "json" };
// export it with a name so you can tell them apart in the index.js file
export { router as HomeRoute };

// here's an example route that you can use to test that this is working
// it's a good idea to only set routes under a specific path for each router,
// so it's easier to keep track of which router handles which routes

router.get('/', async (req, res) => {
  const host = req.hostname;
  const subdomain = host.split(".")[0];
  const path = req.originalUrl.split("/");
  //const session = await getSession(req)
 // const alerts = await getAlerts()
 // const [groups] = await database.execute('SELECT COUNT(*) AS GroupCount FROM `Groups`');
  if (host) {
      //console.log(session)
      if (session.success) {
          res.status(200).render("./Website/index.ejs", {
              name: config.name,
              baseurl: config.baseurl,
            //  session: session.data,
             // alerts: alerts,
       // groups: groups[0]
          });
      } else {
          res.status(200).render("./Website/index.ejs", {
              name: config.name,
              baseurl: config.baseurl,
            //  session: {session: false},
             // alerts: alerts,
       // groups: groups[0]
          });
      }
  } else {
      res.status(200).send("<h1>Sub-Domains have not yet been set up</h1>");
  }
});