// Test data for login scenarios used in Storabble login tests
export const loginData = {
  registered: {
    email: "nenadqatester+storabble@gmail.com",
    password: "Storabble1",
    expectedPage: "My storage listings",
  },
  emptyFields: {
    email: "",
    password: "",
    expectedErrors: ["This field is required.", "This field is required."],
  },
  invalidEmailFormat: {
    email: "invalidemail.com",
    password: "ValidPassword123",
    expectedError: "Please enter a valid email address.",
  },
  unregistered: {
    email: "notregistered@mailinator.com",
    password: "RandomPassword1!",
    expectedError:
      "We couldn't find an account with that email. Try another, or get a new Storabble account.",
  },
  onlyEmail: {
    email: "test@mail.com",
    password: "",
    expectedError: "This field is required.",
  },
  onlyPassword: {
    email: "",
    password: "ValidPassword123",
    expectedError: "This field is required.",
  },
};
export const passwordResetData = {
  expectedUrlPattern: /.*\/en\/reset-password/, // Regex pattern for URL validation
};
export const homePageData = {
  expectedUrlPattern: /.*\/en\/listings(\?.*)?$/, // Regex pattern for URL validation
};
