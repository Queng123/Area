import 'package:flutter/material.dart';
import 'package:giffy_dialog/giffy_dialog.dart';

class CustomDialog {
  static void dialogForgotPassword(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return GiffyDialog.image(
          Image.network(
            "https://i.gifer.com/7GKT.gif",
            height: 200,
            fit: BoxFit.cover,
          ),
          title: const Text(
            'Forgot Password ?',
            textAlign: TextAlign.center,
          ),
          content: const Text(
            'Please contact your administrator to reset your password.',
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text('Cancel', style: TextStyle(color: Colors.red , fontWeight: FontWeight.bold)),
            ),
            TextButton(
              onPressed: () => Navigator.pop(context, 'OK'),
              child: const Text('OK', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }

  static void dialogSignUpWaitingEmail(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return GiffyDialog.image(
          Image.network(
            "https://i.gifer.com/7d1.gif",
            height: 200,
            fit: BoxFit.cover,
          ),
          title: const Text(
            'Email Waiting Confirmation',
            textAlign: TextAlign.center,
          ),
          content: const Text(
            'Please check your email to confirm your account.',
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text('Cancel', style: TextStyle(color: Colors.red , fontWeight: FontWeight.bold)),
            ),
            TextButton(
              onPressed: () => {
                Navigator.pushNamed(context, '/login'),
              },
              child: const Text('Ok', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }
}
