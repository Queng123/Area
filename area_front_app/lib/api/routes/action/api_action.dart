import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiAction {
  static Future<List<Map<String, String>>> getActions() async {
    final http.Response response = await ApiRequests.get(ApiRoutes.actions);

    if (response.statusCode == 200) {
      try {
        final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
        final List<dynamic> actionsData = jsonResponse['actions'];

        final List<Map<String, String>> actions =
            actionsData.map<Map<String, String>>((dynamic item) {
          return {
            'name': item['name'] as String,
            'description': item['description'] as String,
          };
        }).toList();

        return actions;
      } catch (e) {
        throw Exception('Failed to parse actions data');
      }
    } else {
      throw Exception(
          'Failed to load actions. Status code: ${response.statusCode}');
    }
  }
}
