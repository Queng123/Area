import 'package:url_launcher/url_launcher.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiDeezer {
  static String clientID = dotenv.env['DEEZER_CLIENT_ID'] ?? '';
  static String clientSECRET = dotenv.env['DEEZER_CLIENT_SECRET'] ?? '';
  static String clientSCOPE = dotenv.env['DEEZER_CLIENT_SCOPE'] ?? '';

  Future<void> authenticateWithDeezer() async {
    if (clientID.isEmpty || clientSECRET.isEmpty) {
      throw 'Missing Deezer client ID or client secret';
    }

    final authCallbackURL =
        Uri.encodeFull(ApiRoutes.baseUrl + ApiRoutes.authDeezer);

    final String link =
        '${ApiRoutes.authorizeDeezer}client_id=$clientID&scope=$clientSCOPE&redirect_uri=$authCallbackURL&response_type=code&client_secret=$clientSECRET';

    Uri uri = Uri.parse(link);

    if (!await launchUrl(uri)) {
      throw 'Could not launch $link';
    }
  }
}
