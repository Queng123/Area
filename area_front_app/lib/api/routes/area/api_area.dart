import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiArea {
  static Future<int> createArea(String actionName, String reactionName) async {
    final http.Response response =
        await ApiRequests.get('${ApiRoutes.area}$actionName-$reactionName');

    if (response.statusCode == 200) {
      return response.statusCode;
    } else {
      throw Exception(
          'Failed to load area. Status code: ${response.statusCode}');
    }
  }

  static Future<int> deleteArea(String actionName, String reactionName) async {
    final http.Response response =
        await ApiRequests.delete('${ApiRoutes.area}$actionName-$reactionName');

    return response.statusCode;
  }

  static Future<List<Map<String, String>>> getArea() async {
    final http.Response response = await ApiRequests.get(ApiRoutes.area);
    List<Map<String, String>> area = [];

    if (response.statusCode == 200) {
      try {
        final List<dynamic> jsonResponse = jsonDecode(response.body)[1];

        area = jsonResponse.map<Map<String, String>>((dynamic item) {
          return {
            'action_id': item['action_id'].toString(),
            'reaction_id': item['reaction_id'].toString(),
          };
        }).toList();
        return area;
      } catch (e) {
        return area;
      }
    }
    return area;
  }
}
