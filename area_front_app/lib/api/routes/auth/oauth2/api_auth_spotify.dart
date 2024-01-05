import 'package:url_launcher/url_launcher.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiSpotify {
  static String clientID = dotenv.env['SPOTIFY_CLIENT_ID'] ?? '';
  static String clientScope = dotenv.env['SPOTIFY_CLIENT_SCOPE'] ?? '';

  Future<void> authenticateWithSpotify() async {
    if (clientID.isEmpty) {
      throw 'Missing Spotify client ID or client secret';
    }

    final authCallbackURL =
        Uri.encodeFull(ApiRoutes.baseUrl + ApiRoutes.authSpotify);

    final String link =
        '${ApiRoutes.authorizeSpotify}client_id=$clientID&response_type=code&redirect_uri=$authCallbackURL&scope=$clientScope';
    Uri uri = Uri.parse(link);

    if (!await launchUrl(uri)) {
      throw 'Could not launch $link';
    }
  }
}
