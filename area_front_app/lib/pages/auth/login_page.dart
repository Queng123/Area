import 'package:flutter/material.dart';
import 'package:area_front_app/components/generic_button.dart';
import 'package:area_front_app/components/styled_text_field.dart';
import 'package:area_front_app/components/image_tile_blur.dart';
import 'package:area_front_app/api/routes/auth/api_login.dart';
import 'package:area_front_app/api/components/handler_validation_request.dart';
import 'package:area_front_app/api/routes/auth/oauth2/api_auth_google.dart';
import 'package:area_front_app/components/dialogs/custom_dialog.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  key: const Key('logo_image'),
                  'lib/images/logo.png',
                  height: 200,
                ),
                const SizedBox(height: 20),
                StyledTextField(
                  controller: emailController,
                  hintText: 'Address Email',
                  obscureText: false,
                  validator: (value) {
                    if (value == null ||
                        value.isEmpty ||
                        !value.contains('@')) {
                      return 'Please enter a valid email address';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                StyledTextField(
                  controller: passwordController,
                  hintText: 'Password',
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty || value.length < 6) {
                      return 'Please enter a valid password (6 characters minimum)';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: () {
                          CustomDialog.dialogForgotPassword(context);
                        },
                        child: Text(
                          'Forgot Password?',
                          style: TextStyle(color: Colors.grey[600]),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 25),
                GenericButton(
                  onTap: () {
                    if (_formKey.currentState!.validate()) {
                      ApiLogin.login(
                              emailController.text, passwordController.text)
                          .then((statusCode) {
                        HandlerValidationRequest.showMessage(
                            context, statusCode, 'Login', '/home');
                      });
                    }
                  },
                  buttonText: "Login",
                  buttonColor: Colors.black,
                  textColor: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  padding: 25,
                  margin: 25,
                  borderRadius: 8,
                ),
                const SizedBox(height: 50),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Divider(
                          thickness: 0.5,
                          color: Colors.grey[400],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10.0),
                        child: Text(
                          'Or continue with',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                      ),
                      Expanded(
                        child: Divider(
                          thickness: 0.5,
                          color: Colors.grey[400],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 25),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    GestureDetector(
                      onTap: () {
                        ApiOAuth2Google.getLinkOAuth2Google()
                            .then((requestbody) {
                          ApiOAuth2Google.redirection(requestbody);
                        });
                      },
                      child: const ImageTileBlur(
                        key: Key('google_image'),
                        imagePath: 'lib/images/google.png',
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 50),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Not a member?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(width: 4),
                    GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, '/register');
                      },
                      child: const Text(
                        'Register here',
                        style: TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
