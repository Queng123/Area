import 'package:flutter/material.dart';
import 'package:area_front_app/api/protocol/api_protocol_body.dart';
import 'package:area_front_app/components/dialogs/custom_dialog.dart';

class HandlerValidationRequest {
  static void showMessage(
      BuildContext context, int statusCode, String title, String route) {
    String message = ApiProtocolBody.getMessage(title, statusCode.toString());

    if (statusCode == 201 || statusCode == 200 && title == 'Sign Up') {
      CustomDialog.dialogSignUpWaitingEmail(context);
    } else {
      if (statusCode == 201 || statusCode == 200) {
        Future.delayed(Duration.zero, () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(message),
              duration: const Duration(seconds: 1),
              behavior: SnackBarBehavior.floating,
              action: SnackBarAction(
                label: 'OK',
                onPressed: () {},
              ),
            ),
          );
        });
        if (route.isNotEmpty) {
          Future.delayed(const Duration(seconds: 3), () {
            Navigator.pushNamed(context, route);
          });
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
}
