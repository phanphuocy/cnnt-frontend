export default (req, res) => {
  /* Only allow GET method request to be used */
  switch (req.method) {
    case 'GET':
      return res.status(200).json(['OKE']);
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({
        message: `Method ${req.method} is not allowed.`,
      });
  }
};
