const { getPipValue } = require("../utils/get-pip-val.cjs");

const calculateLotSize = async (req, res) => {
  const { accountBalance, entry, stopLoss, risk, base, quote } = req.body;

  const baseCurrency = base.toUpperCase(); // Use toUpperCase(), not uppercase()
  const quoteCurrency = quote.toUpperCase();
  const riskPercent = parseFloat(risk);
  const entryPrice = parseFloat(entry);
  const stopPrice = parseFloat(stopLoss);

  try {
    // Get the pip value for the specified currency pair
    const pipValue = await getPipValue();

    // Calculate risk amount
    const riskAmount = (accountBalance * riskPercent) / 100;

    // Calculate pips at risk
    const pipsAtRisk = entryPrice - stopPrice;

    // Calculate lot size
    const lotSize = riskAmount / (pipsAtRisk * pipValue);

    res.status(200).json({ lotSize });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to calculate lot size" });
  }
};

module.exports = { calculateLotSize };
