module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '50b5ccf75e96f16d75642b2496f22626'),
  },
});
