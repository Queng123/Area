import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:convert';

class ApiOAuth2Google {
  static Future<String> getLinkOAuth2Google() async {
    try {
      final http.Response response =
          await ApiRequests.get(ApiRoutes.loginGoogle);
      if (response.statusCode == 200) {
        return response.body;
      } else if (response.statusCode == 400) {
        return 'Email not confirmed';
      } else {
        return 'An error occurred while logging in';
      }
    } catch (error) {
      throw Exception(
          'Error while requesting ${ApiRoutes.loginGoogle} : $error');
    }
  }

  static Future<void> redirection(String jsonString) async {
    try {
      final Map<String, dynamic> jsonMap = json.decode(jsonString);
      final String? message = jsonMap['message'];
      
      if (message != null && message.startsWith('success:')) {
        final String link = message.substring('success:'.length).trim();
        Uri uri = Uri.parse(link);
        if (!await launchUrl(uri)) {
          throw 'Could not launch $link';
        }
      } else {
        throw 'message is null or not start with success:';
      }
    } catch (error) {
      throw Exception('Error while decoding json : $error');
    }
  }
}
