class ApiProtocolBody {
  static final Map<String, Map<String, String>> protocolBody = {
    'Sign Up': {
      '201': 'You have been successfully registered',
      '400': 'This email is already used',
      '500': 'An error occurred while registering',
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
