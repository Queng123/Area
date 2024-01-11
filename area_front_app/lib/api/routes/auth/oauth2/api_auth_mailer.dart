import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiMailer {
  Future<int> authenticateWithMailer() async {
    final http.Response response = await ApiRequests.get(ApiRoutes.authMailer);
    if (response.statusCode == 200) {
      return 200;
    } else {
      return response.statusCode;
    }
  }
}
