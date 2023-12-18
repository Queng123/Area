import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiLogout {
  static Future<int> logout() async {
    try {
      final http.Response response = await ApiRequests.get(ApiRoutes.logout);
      return response.statusCode;
    } catch (error) {
      throw Exception('Error while requesting ${ApiRoutes.logout} : $error');
    }
  }
}
