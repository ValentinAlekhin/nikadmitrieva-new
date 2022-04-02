module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/image',
     handler: 'image.index',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
