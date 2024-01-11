import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiReaction {
  static Future<List<Map<String, String>>> getReaction() async {
    final http.Response response = await ApiRequests.get(ApiRoutes.reactions);

    if (response.statusCode == 200) {
      try {
        final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
        final List<dynamic> reactionData = jsonResponse['reactions'];

        final List<Map<String, String>> reaction =
            reactionData.map<Map<String, String>>((dynamic item) {
          return {
            'name': item['name'] as String,
            'description': item['description'] as String,
          };
        }).toList();

        return reaction;
      } catch (e) {
        return [];
      }
    } else {
      throw Exception(
          'Failed to load reaction. Status code: ${response.statusCode}');
    }
  }
}
