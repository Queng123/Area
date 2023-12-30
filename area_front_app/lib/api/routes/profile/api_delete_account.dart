import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiDeleteAccount {
  static Future<int> deleteAccount() async {
    try {
      final http.Response response = await ApiRequests.delete(ApiRoutes.deleteAccount);
      return response.statusCode;
    } catch (error) {
      throw Exception('Error while requesting ${ApiRoutes.deleteAccount} : $error');
    }
  }
}
