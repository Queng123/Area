import 'package:url_launcher/url_launcher.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiDiscord {
  static String clientID = dotenv.env['DISCORD_CLIENT_ID'] ?? '';
  static String clientSCOPE = dotenv.env['DISCORD_CLIENT_SCOPE'] ?? '';

  Future<void> authenticateWithDiscord() async {
    if (clientID.isEmpty) {
      throw 'Missing Discord client ID or client secret';
    }

    final authCallbackURL =
        Uri.encodeFull(ApiRoutes.baseUrl + ApiRoutes.authDiscord);

    final String link = '${ApiRoutes.authorizeDiscord}client_id=$clientID&redirect_uri=$authCallbackURL&response_type=code&scope=$clientSCOPE';
    Uri uri = Uri.parse(link);
    
    if (!await launchUrl(uri)) {
      throw 'Could not launch $link';
    }
  }
}
