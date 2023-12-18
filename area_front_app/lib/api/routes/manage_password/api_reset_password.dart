import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiPassword {
  static Future<int> resetPassword(String email) async {
    final Map<String, dynamic> requestBody = {
      'email': email,
    };

    try {
      final http.Response response = await ApiRequests.post(ApiRoutes.resetPassword, requestBody);
      return response.statusCode;
    } catch (error) {
      throw Exception('Error while requesting ${ApiRoutes.resetPassword} : $error');
    }
  }
}
