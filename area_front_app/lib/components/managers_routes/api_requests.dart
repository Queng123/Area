import 'package:http/http.dart' as http;
import 'package:area_front_app/components/managers_routes/api_routes.dart';

class ApiRequests {
  static Future<http.Response> post(String route, Map<String, dynamic> body) async {
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
}
