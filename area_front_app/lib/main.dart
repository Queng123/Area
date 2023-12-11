import 'package:flutter/material.dart';
import 'package:area_front_app/pages/auth/login_page.dart';
import 'package:area_front_app/pages/auth/register_page.dart';
import 'package:area_front_app/pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Area',
      debugShowCheckedModeBanner: false,
      initialRoute: '/login',
      onGenerateRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) {
            switch (settings.name) {
              case '/login':
                return const LoginPage();
              case '/register':
                return const RegisterPage();
              case '/home':
                return const HomePage();
              default:
                return const LoginPage();
            }
          },
        );
      },
    );
  }
}
