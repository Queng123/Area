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
  static const String authGoogle = 'auth/google/callback';
  static const String authorizeGoogle = 'https://accounts.google.com/o/oauth2/v2/auth?';
  static const String authSpotify = 'auth/spotify/callback';
  static const String authorizeSpotify =
      'https://accounts.spotify.com/authorize?';
  static const String authDeezer = 'auth/deezer/callback';
  static const String authorizeDeezer = 'https://connect.deezer.com/oauth/auth.php?';
  static const String authDiscord = 'auth/discord/callback';
  static const String authorizeDiscord = 'https://discord.com/api/oauth2/authorize?';
}
