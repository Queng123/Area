import 'package:flutter/material.dart';
import 'package:area_front_app/components/managers_routes/protocol/api_protocol_body.dart';

class HandlerValidationRequest {
  static void showMessage(
      BuildContext context, int statusCode, String title, String route) {
    String message = ApiProtocolBody.getMessage(title, statusCode.toString());

    if (statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          duration: const Duration(seconds: 5),
          behavior: SnackBarBehavior.floating,
          action: SnackBarAction(
            label: 'OK',
            onPressed: () {},
          ),
        ),
      );
      if (route.isNotEmpty) {
        Navigator.pushNamed(context, route);
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          duration: const Duration(seconds: 5),
          behavior: SnackBarBehavior.floating,
          action: SnackBarAction(
            label: 'OK',
            onPressed: () {},
          ),
        ),
      );
    }
  }
}
