const request = require("request");

require("dotenv").config();
const apiKey = process.env.ALPHA_KEY;

async function getPipValue() {
  // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
  var url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=${apiKey}`;

  console.log(url);

  try {
    request.get(
      {
        url: url,
        json: true,
        headers: { "User-Agent": "request" },
      },
      (err, res, data) => {
        if (err) {
          console.log("Error:", err);
        } else if (res.statusCode !== 200) {
          console.log("Status:", res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getPipValue };
