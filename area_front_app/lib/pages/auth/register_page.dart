import 'package:flutter/material.dart';
import 'package:area_front_app/components/generic_button.dart';
import 'package:area_front_app/components/styled_text_field.dart';
import 'package:area_front_app/components/managers_routes/routes/api_register.dart';
import 'package:area_front_app/components/managers_routes/handler_validation_request.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: Form(
            key: _formKey,
            child: ListView(
              padding: const EdgeInsets.all(16.0),
              children: [
                Image.asset(
                  key: const Key('logo_image'),
                  'lib/images/logo.png',
                  height: 200,
                ),
                const SizedBox(height: 20),
                StyledTextField(
                  controller: emailController,
                  hintText: 'Adress Email',
                  obscureText: false,
                  validator: (value) {
                    if (value == null || value.isEmpty || !value.contains('@')) {
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
                const SizedBox(height: 20),
                StyledTextField(
                  controller: confirmPasswordController,
                  hintText: 'Confirm Password',
                  obscureText: true,
                  validator: (value) {
                    if (value != passwordController.text) {
                      return 'Passwords do not match';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 40),
                GenericButton(
                  onTap: () {
                    if (_formKey.currentState!.validate()) {
                      ApiRegister.register(emailController.text, passwordController.text).then((statusCode)
                      {
                        HandlerValidationRequest.showMessage(context, statusCode, 'Sign Up', '/login');
                      });
                    }
                  },
                  buttonText: "Sign Up",
                  buttonColor: Colors.black,
                  textColor: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  padding: 25,
                  margin: 25,
                  borderRadius: 8,
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Already have an account?',
                      style: TextStyle(color: Colors.grey[700]),
                    ),
                    const SizedBox(width: 4),
                    GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, '/login');
                      },
                      child: const Text(
                        'Login',
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
