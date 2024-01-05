import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiRoutes {
  static String baseUrl = dotenv.env['BASE_URL'] ?? '';

  static const String signUpEmail = 'user/register/email';
  static const String loginEmail = 'user/login/email';
  static const String loginGoogle = 'user/login/google';
  static const String logout = 'user/logout';
  static const String resetPassword = 'user/reset-password';
  static const String updatePassword = 'user/update-password';
  static const String username = 'user/';
  static const String deleteAccount = 'user/';
  static const String userServices = 'user/services';
  static const String authGithub = 'auth/github/callback';
  static const String authorizeGithub =
      'https://github.com/login/oauth/authorize?';
  static const String actions = 'actions';
  static const String reactions = 'reactions';
  static const String area = 'area/';
  static const String authSpotify = 'auth/spotify/callback';
  static const String authorizeSpotify =
      'https://accounts.spotify.com/authorize?';
  static const String authMSTeams = 'auth/teams/callback';
  static const String authorizeMSTeams = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
}
