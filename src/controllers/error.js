exports.server = (err, req, res, next) => {
  console.log(err.message);
  res
    .status(404)
    .send('Page Not Found');
};
