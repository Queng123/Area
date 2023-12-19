import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiRoutes {
  static String baseUrl = dotenv.env['BASE_URL'] ?? '';

  static const String signUpEmail = 'user/register/email';
  static const String loginEmail = 'user/login/email';
  static const String loginGoogle = 'user/login/google';
  static const String logout = 'user/logout';
  static const String resetPassword = 'user/reset-password';
  static const String updatePassword = 'user/update-password';
}
