import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiLogin {
  static Future<int> login(String email, String password) async {
    final Map<String, dynamic> requestBody = {
      'email': email,
      'password': password,
    };

    try {
      final http.Response response = await ApiRequests.post(ApiRoutes.loginEmail, requestBody);
      return response.statusCode;
    } catch (error) {
      throw Exception('Error while requesting ${ApiRoutes.loginEmail} : $error');
    }
  }
}
