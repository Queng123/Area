import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiMeteo {
  Future<int> authenticateWithMeteo() async {
    final http.Response response = await ApiRequests.get(ApiRoutes.authMeteo);
    if (response.statusCode == 200) {
      return 200;
    } else {
      return response.statusCode;
    }
  }
}
