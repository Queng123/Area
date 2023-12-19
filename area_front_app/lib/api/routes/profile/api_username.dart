import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';
import 'dart:convert';

class ApiUsername {
  static Future<String> getUsername() async {
    try {
      final http.Response response = await ApiRequests.get(ApiRoutes.username);
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        final String username = data['message'];
        return username;
      } else {
        throw Exception('Error while requesting ${ApiRoutes.username}. Status code: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Error while requesting ${ApiRoutes.username}: $error');
    }
  }
}
