exports.calc = async function (req, res, callback) {
  const formula = req.body.formula;
  console.log('formula', formula);
  let result = { result: eval(formula) };

  return callback(result);
};
