import 'package:url_launcher/url_launcher.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiGitHub {
  static String clientID = dotenv.env['CLIENT_ID'] ?? '';
  static String clientSCOPE = dotenv.env['CLIENT_SCOPE'] ?? '';

  Future<void> authenticateWithGitHub() async {
    if (clientID.isEmpty) {
      throw 'Missing GitHub client ID or client secret';
    }

    final authCallbackURL =
        Uri.encodeFull(ApiRoutes.baseUrl + ApiRoutes.authGithub);

    final String link =
        '${ApiRoutes.authorizeGithub}client_id=$clientID&redirect_uri=$authCallbackURL&scope=$clientSCOPE';
    Uri uri = Uri.parse(link);
    if (!await launchUrl(uri)) {
      throw 'Could not launch $link';
    }
  }
}
