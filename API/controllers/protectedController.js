// Controller to handle the logic for the protected routes
export const dashboard = (req, res) => {
  res.json({
    message: "Welcome to the protected dashboard!",
    user: req.user, // user information from the token
  });
};

export const profile = (req, res) => {
  res.json({
    message: "Your profile data",
    user: req.user, // user information from the token
  });
};
