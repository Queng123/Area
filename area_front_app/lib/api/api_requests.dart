import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_endpoints.dart';

class ApiRequests {
  static Future<http.Response> post(
      String route, Map<String, dynamic> body) async {
    final Uri apiUrl = Uri.parse('${ApiRoutes.baseUrl}$route');

    try {
      final http.Response response = await http.post(
        apiUrl,
        body: body,
      );
      return response;
    } catch (error) {
      throw Exception('Error while requesting $apiUrl : $error');
    }
  }

  static Future<http.Response> get(String route) async {
    final Uri apiUrl = Uri.parse('${ApiRoutes.baseUrl}$route');

    try {
      final http.Response response = await http.get(apiUrl);
      return response;
    } catch (error) {
      throw Exception('Error while requesting $apiUrl : $error');
    }
  }

  static Future<http.Response> delete(String route) async {
    final Uri apiUrl = Uri.parse('${ApiRoutes.baseUrl}$route');

    try {
      final http.Response response = await http.delete(apiUrl);
      return response;
    } catch (error) {
      throw Exception('Error while requesting $apiUrl : $error');
    }
  }
}
