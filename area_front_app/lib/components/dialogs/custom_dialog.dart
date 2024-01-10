import 'package:area_front_app/api/routes/profile/api_delete_account.dart';
import 'package:flutter/material.dart';
import 'package:giffy_dialog/giffy_dialog.dart';
import 'package:area_front_app/api/routes/auth/api_logout.dart';
import 'package:area_front_app/api/routes/manage_password/api_reset_password.dart';
import 'package:area_front_app/components/styled_text_field.dart';

class CustomDialog {
  static void dialogForgotPassword(BuildContext context) {
    TextEditingController emailController = TextEditingController();
    GlobalKey<FormState> formKey = GlobalKey<FormState>();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Forgot Password?', textAlign: TextAlign.center),
          content: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 16),
                StyledTextField(
                  controller: emailController,
                  hintText: 'Email',
                  obscureText: false,
                  validator: (value) {
                    if (value!.length > 50) {
                      return 'Please enter a valid email address';
                    }
                    if (value.isEmpty || !value.contains('@')) {
                      return 'Please enter your email';
                    }
                    return null;
                  },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text(
                'Cancel',
                style:
                    TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            ),
            TextButton(
              onPressed: () {
                if (formKey.currentState?.validate() == true) {
                  String enteredEmail = emailController.text;
                  ApiPassword.resetPassword(enteredEmail).then((statusCode) {
                    if (statusCode == 200) {
                      showEmailSentDialog(context);
                    }
                  });
                }
              },
              child: const Text(
                'Send Email',
                style:
                    TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        );
      },
    );
  }

  static void showEmailSentDialog(BuildContext context) {
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
            'Email Sent',
            textAlign: TextAlign.center,
          ),
          content: const Text(
            'Please check your email to reset your password.',
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pushNamed(context, '/login'),
              child: const Text(
                'OK',
                style:
                    TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
              ),
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
              child: const Text('Cancel',
                  style: TextStyle(
                      color: Colors.red, fontWeight: FontWeight.bold)),
            ),
            TextButton(
              onPressed: () => {
                Navigator.pushNamed(context, '/login'),
              },
              child: const Text('Ok',
                  style: TextStyle(
                      color: Colors.green, fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }

  static void dialogSignOut(BuildContext context, userProfile) {
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
            'Sign Out',
            textAlign: TextAlign.center,
          ),
          content: const Text(
            'You have been disconnected.',
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text('Cancel',
                  style: TextStyle(
                      color: Colors.red, fontWeight: FontWeight.bold)),
            ),
            TextButton(
              onPressed: () {
                ApiLogout.logout().then((statusCode) {
                  if (statusCode == 200) {
                    userProfile.isConnect = false;
                    Navigator.pushNamed(context, '/login');
                  }
                });
              },
              child: const Text('Yes',
                  style: TextStyle(
                      color: Colors.green, fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }

  static void dialogDeleteAccount(BuildContext context, userProfile) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return GiffyDialog.image(
          Image.network(
            "https://jai-un-pote-dans-la.com/wp-content/uploads/2021/12/giphy-2-1.gif",
            height: 200,
            fit: BoxFit.cover,
          ),
          title: const Text(
            'Delete Account',
            style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          content: const Text(
            'Are you sure you want to delete your account ?',
            textAlign: TextAlign.center,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text('Cancel',
                  style: TextStyle(
                      color: Colors.green, fontWeight: FontWeight.bold)),
            ),
            TextButton(
              onPressed: () {
                ApiDeleteAccount.deleteAccount().then((statusCode) {
                  if (statusCode == 200) {
                    userProfile.isConnect = false;
                    Navigator.pushNamed(context, '/login');
                  }
                });
              },
              child: const Text('Delete',
                  style: TextStyle(
                      color: Colors.red, fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }
}
