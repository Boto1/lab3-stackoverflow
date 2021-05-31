import jwt from 'jsonwebtoken';

export default async function checkJWT(req, res, next) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.cookies.token;

  if (!secretKey) {
    return res.status(500).send({ success: false, error: 'Failed to authorize' });
  }

  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).send({ success: false, error: 'Unauthorized' });
  }

  req.user = jwtPayload;

  next();
}
