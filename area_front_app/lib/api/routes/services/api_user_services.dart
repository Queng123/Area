import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:area_front_app/api/api_requests.dart';
import 'package:area_front_app/api/api_endpoints.dart';

class ApiUserServices {
  static Future<Map<String, bool>> isServiceConnected() async {
    try {
      final http.Response response =
          await ApiRequests.get(ApiRoutes.userServices);
      if (response.statusCode == 200) {
        Map<String, dynamic> responseJson = jsonDecode(response.body);
        List<dynamic> services = jsonDecode(responseJson["message"]);
        Map<String, bool> servicesMap = {};
        for (var service in services) {
          String name = service["name"];
          bool isConnected = service["isConnected"];
          servicesMap[name] = isConnected;
        }
        return servicesMap;
      } else {
        throw Exception(
            'Error while requesting ${ApiRoutes.userServices}. Status code: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception(
          'Error while requesting ${ApiRoutes.userServices}: $error');
    }
  }

  static Future<int> deleteService(String serviceName) async {

    if (serviceName != "Github" && serviceName != "Google" && serviceName != "Discord" && serviceName != "Spotify" && serviceName != "Deezer" && serviceName != "Mailer" && serviceName != "Meteo") {
      return 400;
    }

    final Map<String, dynamic> requestBody = {
      'service': serviceName,
    };
    try {
      final http.Response response = await ApiRequests.deleteWithBody(
          ApiRoutes.userServices, requestBody);
      return response.statusCode;
    } catch (error) {
      throw Exception('Error while requesting ${ApiRoutes.loginEmail} : $error');
    }
  }
}
