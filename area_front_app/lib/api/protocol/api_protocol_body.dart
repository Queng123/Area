class ApiProtocolBody {
  static final Map<String, Map<String, String>> protocolBody = {
    'Sign Up': {
      '201': 'You have been successfully registered',
      '400': 'This email is already used',
      '500': 'An error occurred while registering',
    },
    'Login': {
      '200': 'You have been successfully logged in',
      '400': 'Email not confirmed',
      '500': 'An error occurred while logging in',
    },
    'OAuth2 Google': {
      '200': 'Send the google login url.',
      '400': 'Email not confirmed',
      '500': 'An error occurred while logging in',
    },
  };

  static String getMessage(String title, String statusCode) {
    final Map<String, String>? responseInfo = protocolBody[title];
    if (responseInfo != null) {
      return responseInfo[statusCode] ?? 'An error occurred';
    }
    return 'An error occurred';
  }
}
