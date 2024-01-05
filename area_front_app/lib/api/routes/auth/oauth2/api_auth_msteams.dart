import 'package:url_launcher/url_launcher.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiMSTeams {
  static String clientID = dotenv.env['MSTEAMS_CLIENT_ID'] ?? '';
  static String clientSCOPE = dotenv.env['MSTEAMS_CLIENT_SCOPE'] ?? '';
  static String clientSECRET = dotenv.env['MSTEAMS_CLIENT_SECRET'] ?? '';

  Future<void> authenticateWithMSTeams() async {
    if (clientID.isEmpty || clientSECRET.isEmpty) {
      throw 'Missing MSTeams client ID or client secret';
    }

    final authCallbackURL =
        Uri.encodeFull(ApiRoutes.baseUrl + ApiRoutes.authMSTeams);

    final String link =
        '${ApiRoutes.authorizeMSTeams}client_id=$clientID&scope=$clientSCOPE&redirect_uri=$authCallbackURL&response_type=code&client_secret=$clientSECRET';

    Uri uri = Uri.parse(link);

    if (!await launchUrl(uri)) {
      throw 'Could not launch $link';
    }
  }
}
