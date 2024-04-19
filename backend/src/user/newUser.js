const newUser = async (req, res) => {
    const customHeader = req.headers['custom-header'];
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        // // Extract the token after "Bearer "
        // const token = authorizationHeader.split(" ")[1];
    
        // // Handle the request with the token
        // res.send('Received Bearer token: ' + token);
        return res.json([
            {
              name: "habib",
            },
            {
              name: "hamida",
            },
            {
              name: "habiba",
            },
            {
              name: "hasib",
            },
          ]);
      } else {
        // Authorization header is missing or doesn't start with "Bearer"
        res.status(401).send('Unauthorized');
      }
};

export default newUser;
